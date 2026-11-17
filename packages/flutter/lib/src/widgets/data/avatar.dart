import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';

/// A person or group shown by initials (or a real photo) in a circle.
///
/// When the name is written next to it, leave [semanticLabel] null so the
/// avatar is hidden from screen readers. Alone, give it the name and the
/// presence in words ("Ayu Rahma, daring").
class LdsAvatar extends StatelessWidget {
  /// Creates an avatar.
  const LdsAvatar(
    this.initials, {
    super.key,
    this.size = 40,
    this.gray = false,
    this.square = false,
    this.online = false,
    this.image,
    this.semanticLabel,
  });

  /// One or two initials, or "+2" in a stack.
  final String initials;

  /// Diameter in logical pixels. The initials scale with it.
  final double size;

  /// Neutral tint, for people who are not members or to tell people apart.
  final bool gray;

  /// Rounded square, for organizations and groups.
  final bool square;

  /// Shows the green presence dot.
  final bool online;

  /// A real photo. Never a generated face.
  final ImageProvider? image;

  /// Announced name; null hides the avatar from screen readers.
  final String? semanticLabel;

  // [ring] is drawn around the avatar inside an [LdsAvatarStack].
  Widget _build(BuildContext context, {Color? ring}) {
    final c = context.lds;
    final radius = square
        ? BorderRadius.circular(size * 0.28)
        : BorderRadius.circular(size / 2);
    Widget face = Container(
      width: size,
      height: size,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: gray ? c.bgRecessed : c.accentTint,
        borderRadius: radius,
        boxShadow:
            ring == null ? null : [BoxShadow(color: ring, spreadRadius: 2)],
        image: image == null
            ? null
            : DecorationImage(image: image!, fit: BoxFit.cover),
      ),
      child: image != null
          ? null
          : Text(
              initials,
              maxLines: 1,
              textScaler: TextScaler.noScaling,
              style: TextStyle(
                fontFamily: LdsType.family,
                fontSize: size * 0.38,
                height: 1,
                fontWeight: FontWeight.w600,
                letterSpacing: -0.01 * size * 0.38,
                color: gray ? c.textDefault : c.accentText,
              ),
            ),
    );
    if (online) {
      final dot = size * 0.28;
      face = Stack(
        clipBehavior: Clip.none,
        children: [
          face,
          Positioned(
            right: 0,
            bottom: 0,
            child: Container(
              width: dot,
              height: dot,
              decoration: BoxDecoration(
                color: c.success,
                shape: BoxShape.circle,
                boxShadow: [BoxShadow(color: c.bgCanvas, spreadRadius: 2)],
              ),
            ),
          ),
        ],
      );
    }
    if (semanticLabel == null) return ExcludeSemantics(child: face);
    return Semantics(
      label: semanticLabel,
      image: true,
      excludeSemantics: true,
      child: face,
    );
  }

  @override
  Widget build(BuildContext context) => _build(context);
}

/// Overlapping avatars for a group working on something.
///
/// Cap it at three or four avatars and end with a "+n" avatar. On hover the
/// avatars fan out 4 px each on the snappy spring.
class LdsAvatarStack extends StatefulWidget {
  /// Creates an avatar stack.
  const LdsAvatarStack({
    super.key,
    required this.avatars,
    required this.semanticLabel,
  });

  /// The avatars, in order.
  final List<LdsAvatar> avatars;

  /// The whole group in words, for example "5 anggota: Ayu, Nadia dan 3
  /// lainnya".
  final String semanticLabel;

  @override
  State<LdsAvatarStack> createState() => _LdsAvatarStackState();
}

class _LdsAvatarStackState extends State<LdsAvatarStack> {
  bool _hover = false;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final avatars = widget.avatars;
    if (avatars.isEmpty) return const SizedBox.shrink();
    final size = avatars.map((a) => a.size).reduce((a, b) => a > b ? a : b);
    final fan = _hover && !context.ldsReduceMotion;
    double left(int i) {
      var x = fan ? i * 4.0 : 0.0;
      for (var j = 0; j < i; j++) {
        x += avatars[j].size - 8;
      }
      return x;
    }

    // Reserve the fanned-out width so hovering never shifts neighbours.
    var width = avatars.last.size + (avatars.length - 1) * 4.0;
    for (var i = 0; i < avatars.length - 1; i++) {
      width += avatars[i].size - 8;
    }
    return Semantics(
      label: widget.semanticLabel,
      image: true,
      excludeSemantics: true,
      child: MouseRegion(
        onEnter: (_) => setState(() => _hover = true),
        onExit: (_) => setState(() => _hover = false),
        child: SizedBox(
          width: width,
          height: size,
          child: Stack(
            clipBehavior: Clip.none,
            children: [
              for (var i = 0; i < avatars.length; i++)
                AnimatedPositioned(
                  left: left(i),
                  top: (size - avatars[i].size) / 2,
                  duration: context.ldsDuration(LdsMotion.snappy),
                  curve: LdsSpringCurve.snappy,
                  child: avatars[i]._build(context, ring: c.bgFill),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

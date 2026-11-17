import 'package:flutter/material.dart';

import '../../theme.dart';
import '../../tokens.g.dart';

/// What one real person said about the product, with their name and role,
/// on the quiet fill.
///
/// Quote real people with their permission. While designing, mark
/// placeholder quotes as example content where readers see them. The
/// initials avatar is decorative; the name is read as text.
class LdsTestimonial extends StatelessWidget {
  /// Creates a testimonial.
  const LdsTestimonial({
    super.key,
    required this.quote,
    required this.name,
    this.role,
    this.avatar,
    this.large = false,
  });

  /// The words, quoted exactly.
  final String quote;

  /// The person.
  final String name;

  /// Role and organization.
  final String? role;

  /// A photo; defaults to the person's initials.
  final Widget? avatar;

  /// The lead quote: 20 to 26 px.
  final bool large;

  String get _initials {
    final parts = name.trim().split(RegExp(r'\s+'));
    final letters = parts.take(2).map((p) => p.isEmpty ? '' : p[0]);
    return letters.join().toUpperCase();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return LayoutBuilder(builder: (context, constraints) {
      final size = large
          ? (constraints.maxWidth * 0.022).clamp(20.0, 26.0)
          : 17.0;
      final quoteStyle = TextStyle(
        fontFamily: LdsType.family,
        fontSize: size,
        height: large ? 1.4 : 27 / 17,
        fontWeight: large ? FontWeight.w500 : FontWeight.w400,
        letterSpacing: (large ? -0.02 : -0.01) * size,
        color: c.textStrong,
      );
      return Semantics(
        container: true,
        child: DecoratedBox(
          decoration: BoxDecoration(
            color: c.bgFill,
            borderRadius:
                const BorderRadius.all(Radius.circular(LdsRadius.xl)),
          ),
          child: Padding(
            padding: const EdgeInsets.all(LdsSpace.s28),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                ConstrainedBox(
                  constraints: BoxConstraints(
                      maxWidth: large ? 36 * size : double.infinity),
                  child: Text(quote, style: quoteStyle),
                ),
                const SizedBox(height: LdsSpace.s24),
                Row(
                  children: [
                    avatar ??
                        ExcludeSemantics(
                          child: Container(
                            width: 40,
                            height: 40,
                            alignment: Alignment.center,
                            decoration: BoxDecoration(
                                color: c.accentTint, shape: BoxShape.circle),
                            child: Text(
                              _initials,
                              style: LdsType.caption.copyWith(
                                  color: c.accentText,
                                  fontWeight: FontWeight.w600),
                            ),
                          ),
                        ),
                    const SizedBox(width: LdsSpace.s12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(name,
                              style: LdsType.bodyStrong
                                  .copyWith(color: c.textStrong)),
                          if (role != null) ...[
                            const SizedBox(height: LdsSpace.s2),
                            Text(role!,
                                style: LdsType.footnote
                                    .copyWith(color: c.textSubtle)),
                          ],
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      );
    });
  }
}

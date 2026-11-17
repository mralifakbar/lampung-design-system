import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';

/// Five stars for rating something from one to five: Nilai layanan
/// kelurahan.
///
/// Hovering previews the score, tapping sets it. It works as a radio group
/// from the keyboard: arrow keys change the score.
class LdsRating extends StatefulWidget {
  /// Creates a rating.
  const LdsRating({
    super.key,
    required this.value,
    required this.onChanged,
    this.semanticLabel = 'Nilai',
    this.max = 5,
    this.starLabel = 'bintang',
  });

  /// The score, 0 when not rated yet.
  final int value;

  /// Called with the new score. Null makes it read-only.
  final ValueChanged<int>? onChanged;

  /// Names the group for screen readers.
  final String semanticLabel;

  /// Number of stars.
  final int max;

  /// Word after the number for each star ("3 bintang").
  final String starLabel;

  @override
  State<LdsRating> createState() => _LdsRatingState();
}

class _LdsRatingState extends State<LdsRating> {
  int _preview = 0;
  late final List<FocusNode> _nodes =
      List.generate(widget.max, (_) => FocusNode());

  @override
  void dispose() {
    for (final n in _nodes) {
      n.dispose();
    }
    super.dispose();
  }

  void _step(int d) {
    if (widget.onChanged == null) return;
    final next = (widget.value + d).clamp(1, widget.max);
    widget.onChanged!(next);
    _nodes[next - 1].requestFocus();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final enabled = widget.onChanged != null;
    final shown = _preview > 0 ? _preview : widget.value;
    return Semantics(
      container: true,
      label: widget.semanticLabel,
      explicitChildNodes: true,
      child: CallbackShortcuts(
        bindings: {
          const SingleActivator(LogicalKeyboardKey.arrowRight): () => _step(1),
          const SingleActivator(LogicalKeyboardKey.arrowUp): () => _step(1),
          const SingleActivator(LogicalKeyboardKey.arrowLeft): () => _step(-1),
          const SingleActivator(LogicalKeyboardKey.arrowDown): () => _step(-1),
        },
        child: MouseRegion(
          onExit: (_) => setState(() => _preview = 0),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              for (var i = 1; i <= widget.max; i++)
                MouseRegion(
                  onEnter: enabled ? (_) => setState(() => _preview = i) : null,
                  child: LdsPressable(
                    onPressed: enabled
                        ? () {
                            _nodes[i - 1].requestFocus();
                            widget.onChanged!(i);
                          }
                        : null,
                    pressedScale: 0.85,
                    focusNode: _nodes[i - 1],
                    selected: i == widget.value,
                    inMutuallyExclusiveGroup: true,
                    semanticLabel: '$i ${widget.starLabel}',
                    excludeChildSemantics: true,
                    borderRadius: const BorderRadius.all(Radius.circular(10)),
                    builder: (context, state) {
                      final on = i <= shown;
                      final previewing = _preview > 0 && i > widget.value;
                      return AnimatedSwitcher(
                        duration: context.ldsDuration(LdsMotion.fast),
                        child: LdsIcon(
                          'star',
                          key: ValueKey('$on$previewing'),
                          size: 30,
                          fill: true,
                          color: !on
                              ? c.textFaint
                              : previewing
                                  ? c.warning.withAlpha(140)
                                  : c.warning,
                        ),
                      );
                    },
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

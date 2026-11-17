import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';

/// One step of an [LdsSteps] sequence.
@immutable
class LdsStep {
  /// Creates a step.
  const LdsStep({required this.label, this.subtitle});

  /// The step name: "Data diri", "Dokumen", "Periksa".
  final String label;

  /// Optional second line: what the step asks for.
  final String? subtitle;
}

/// Numbered steps of a fixed sequence with a bar that fills as each one
/// completes. Shows where people are in a flow and how much is left.
///
/// Steps before [current] are done (a check in an accent dot), the current
/// one has an accent ring. Going back reverses the fill.
class LdsSteps extends StatelessWidget {
  /// Creates steps.
  const LdsSteps({
    super.key,
    required this.steps,
    required this.current,
    this.direction = Axis.horizontal,
    this.semanticLabel = 'Langkah',
  });

  /// The steps, in order.
  final List<LdsStep> steps;

  /// Index of the current step. Equal to the length when all are done.
  final int current;

  /// A row (default) or a column for narrow side panels.
  final Axis direction;

  /// Names the sequence for screen readers.
  final String semanticLabel;

  @override
  Widget build(BuildContext context) {
    final items = <Widget>[
      for (var i = 0; i < steps.length; i++)
        _StepItem(
          step: steps[i],
          number: i + 1,
          total: steps.length,
          done: i < current,
          isCurrent: i == current,
          last: i == steps.length - 1,
          direction: direction,
        ),
    ];
    return Semantics(
      container: true,
      label: semanticLabel,
      explicitChildNodes: true,
      child: direction == Axis.horizontal
          ? Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [for (final w in items) Expanded(child: w)],
            )
          : Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: items,
            ),
    );
  }
}

class _StepItem extends StatelessWidget {
  const _StepItem({
    required this.step,
    required this.number,
    required this.total,
    required this.done,
    required this.isCurrent,
    required this.last,
    required this.direction,
  });

  final LdsStep step;
  final int number;
  final int total;
  final bool done;
  final bool isCurrent;
  final bool last;
  final Axis direction;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final standard = context.ldsDuration(LdsMotion.standard);
    final state = done ? 'selesai' : (isCurrent ? 'langkah ini' : 'belum');

    final dot = AnimatedContainer(
      duration: standard,
      curve: LdsMotion.standardCurve,
      width: 28,
      height: 28,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: done ? c.accent : c.bgBase,
        border: Border.all(
          color: done
              ? c.accent
              : isCurrent
                  ? c.accent
                  : c.lineStrong,
          width: isCurrent ? 2 : 1.5,
        ),
      ),
      child: done
          ? LdsIcon('check', size: 16, color: c.textOnAccent)
          : Text(
              '$number',
              style: LdsType.footnote.copyWith(
                height: 1,
                fontWeight: FontWeight.w600,
                color: isCurrent ? c.accentText : c.textSubtle,
              ),
            ),
    );

    final vertical = direction == Axis.vertical;
    final bar =
        last ? const SizedBox.shrink() : _Bar(filled: done, vertical: vertical);

    final label = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          step.label,
          style: LdsType.footnote.copyWith(
            fontWeight: FontWeight.w500,
            color: done || isCurrent ? c.textStrong : c.textSubtle,
          ),
        ),
        if (step.subtitle != null)
          Text(step.subtitle!,
              style: LdsType.footnote.copyWith(color: c.textMuted)),
      ],
    );

    final Widget body;
    if (vertical) {
      body = IntrinsicHeight(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Column(children: [
              dot,
              if (!last)
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(vertical: 6),
                    // A floor so a one-line label still leaves a visible
                    // connector; taller labels stretch it further.
                    child: ConstrainedBox(
                      constraints: const BoxConstraints(minHeight: 16),
                      child: bar,
                    ),
                  ),
                ),
            ]),
            const SizedBox(width: 12),
            Expanded(
              child: Padding(
                padding: EdgeInsets.only(top: 4, bottom: last ? 0 : 20),
                child: label,
              ),
            ),
          ],
        ),
      );
    } else {
      body = Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(children: [
            dot,
            if (!last)
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8),
                  child: bar,
                ),
              ),
          ]),
          const SizedBox(height: 10),
          Padding(padding: const EdgeInsets.only(right: 12), child: label),
        ],
      );
    }

    return Semantics(
      label: 'Langkah $number dari $total, ${step.label}, $state',
      excludeSemantics: true,
      child: body,
    );
  }
}

/// The connector between two dots. Painted rather than built from
/// fractional boxes, so it has no intrinsic size of its own: a vertical
/// [LdsSteps] measures its height with [IntrinsicHeight], and a
/// zero-height fraction there would report an infinite height.
class _Bar extends StatelessWidget {
  const _Bar({required this.filled, required this.vertical});

  final bool filled;
  final bool vertical;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return SizedBox(
      width: vertical ? 2 : null,
      height: vertical ? null : 2,
      child: TweenAnimationBuilder<double>(
        tween: Tween<double>(end: filled ? 1 : 0),
        duration: context.ldsDuration(LdsMotion.considered),
        curve: LdsMotion.inoutCurve,
        builder: (context, t, _) => CustomPaint(
          painter: _BarPainter(
            track: c.lineStrong,
            fill: c.accent,
            progress: t,
            vertical: vertical,
            rtl: Directionality.of(context) == TextDirection.rtl,
          ),
        ),
      ),
    );
  }
}

class _BarPainter extends CustomPainter {
  _BarPainter({
    required this.track,
    required this.fill,
    required this.progress,
    required this.vertical,
    required this.rtl,
  });

  final Color track;
  final Color fill;
  final double progress;
  final bool vertical;
  final bool rtl;

  @override
  void paint(Canvas canvas, Size size) {
    final bounds = Offset.zero & size;
    final clip = RRect.fromRectAndRadius(bounds, const Radius.circular(1));
    canvas.save();
    canvas.clipRRect(clip);
    canvas.drawRect(bounds, Paint()..color = track);
    final t = progress.clamp(0.0, 1.0);
    if (t > 0) {
      final Rect filled;
      if (vertical) {
        filled = Rect.fromLTWH(0, 0, size.width, size.height * t);
      } else {
        final w = size.width * t;
        filled = rtl
            ? Rect.fromLTWH(size.width - w, 0, w, size.height)
            : Rect.fromLTWH(0, 0, w, size.height);
      }
      canvas.drawRect(filled, Paint()..color = fill);
    }
    canvas.restore();
  }

  @override
  bool shouldRepaint(_BarPainter old) =>
      old.track != track ||
      old.fill != fill ||
      old.progress != progress ||
      old.vertical != vertical ||
      old.rtl != rtl;
}

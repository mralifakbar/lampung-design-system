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
                    child: bar,
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

class _Bar extends StatelessWidget {
  const _Bar({required this.filled, required this.vertical});

  final bool filled;
  final bool vertical;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return ClipRRect(
      borderRadius: BorderRadius.circular(1),
      child: SizedBox(
        width: vertical ? 2 : null,
        height: vertical ? null : 2,
        child: ColoredBox(
          color: c.lineStrong,
          child: TweenAnimationBuilder<double>(
            tween: Tween<double>(end: filled ? 1 : 0),
            duration: context.ldsDuration(LdsMotion.considered),
            curve: LdsMotion.inoutCurve,
            builder: (context, t, _) => FractionallySizedBox(
              alignment: vertical
                  ? Alignment.topCenter
                  : AlignmentDirectional.centerStart,
              widthFactor: vertical ? 1 : t,
              heightFactor: vertical ? t : 1,
              child: ColoredBox(color: c.accent),
            ),
          ),
        ),
      ),
    );
  }
}

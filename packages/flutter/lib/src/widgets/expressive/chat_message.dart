import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../button.dart';
import '../icon.dart';
import 'enter_and_exit.dart';

/// Who speaks in an [LdsChatMessage].
enum LdsChatRole {
  /// What the person sent: right aligned, in the accent bubble.
  me,

  /// The assistant answer: plain reading text across the column.
  assistant,

  /// Another person in a support thread: left aligned, on the quiet fill.
  other,

  /// A line about the conversation itself: a day break, a mode turned on.
  system,
}

/// One turn in a conversation, inside an [LdsChatLayout].
///
/// Your words sit in an accent bubble on the right; the assistant answers as
/// plain text in the column, with [steps] ([LdsToolCall]s) above and
/// [actions] (36 px icon buttons: copy, try again) under a finished answer.
/// A failed message says so in [error] with a Try again button.
///
/// Set [isNew] only on messages that arrive while the chat is open: they rise
/// 8 px and fade in once on the smooth spring. History appears at once.
class LdsChatMessage extends StatelessWidget {
  /// Creates a message.
  const LdsChatMessage({
    super.key,
    required this.role,
    this.text,
    this.child,
    this.name,
    this.meta,
    this.steps = const [],
    this.actions = const [],
    this.error,
    this.onRetry,
    this.retryLabel = 'Coba lagi',
    this.speakerLabel,
    this.isNew = false,
  }) : assert(text != null || child != null, 'Give text or child.');

  /// A message the person sent.
  const LdsChatMessage.me({
    Key? key,
    String? text,
    Widget? child,
    String? meta,
    String? error,
    VoidCallback? onRetry,
    bool isNew = false,
  }) : this(
          key: key,
          role: LdsChatRole.me,
          text: text,
          child: child,
          meta: meta,
          error: error,
          onRetry: onRetry,
          isNew: isNew,
        );

  /// An assistant answer.
  const LdsChatMessage.assistant({
    Key? key,
    String? text,
    Widget? child,
    String? meta,
    List<Widget> steps = const [],
    List<Widget> actions = const [],
    bool isNew = false,
  }) : this(
          key: key,
          role: LdsChatRole.assistant,
          text: text,
          child: child,
          meta: meta,
          steps: steps,
          actions: actions,
          isNew: isNew,
        );

  /// A centered line about the conversation.
  const LdsChatMessage.system(String text, {Key? key, bool isNew = false})
      : this(key: key, role: LdsChatRole.system, text: text, isNew: isNew);

  /// Who speaks.
  final LdsChatRole role;

  /// The words. Use [child] instead for structured answers.
  final String? text;

  /// Rich content in place of [text] (for example an [LdsStreamingText]).
  final Widget? child;

  /// Sender name above the bubble, for [LdsChatRole.other].
  final String? name;

  /// One caption line under the bubble: a time, "Diedit".
  final String? meta;

  /// Steps the assistant took, shown above the answer.
  final List<Widget> steps;

  /// Icon buttons under a finished answer. Name the object in each label
  /// ("Salin jawaban").
  final List<Widget> actions;

  /// Why the message failed ("Belum terkirim. Anda sedang offline.").
  final String? error;

  /// Retries a failed message.
  final VoidCallback? onRetry;

  /// Label of the retry button.
  final String retryLabel;

  /// Read before the message by screen readers when the speaker is not
  /// obvious from layout ("Anda berkata", "Asisten berkata").
  final String? speakerLabel;

  /// Plays the arrival once.
  final bool isNew;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    Widget content = LayoutBuilder(builder: (context, constraints) {
      final w = constraints.maxWidth;
      switch (role) {
        case LdsChatRole.system:
          return Center(
            child: Text(
              text ?? '',
              textAlign: TextAlign.center,
              style: LdsType.footnote.copyWith(color: c.textMuted),
            ),
          );
        case LdsChatRole.assistant:
          return Align(
            alignment: Alignment.centerLeft,
            child: ConstrainedBox(
              constraints: BoxConstraints(maxWidth: math.min(640, w)),
              child: _column(context, CrossAxisAlignment.start),
            ),
          );
        case LdsChatRole.me:
        case LdsChatRole.other:
          final me = role == LdsChatRole.me;
          return Align(
            alignment: me ? Alignment.centerRight : Alignment.centerLeft,
            child: ConstrainedBox(
              constraints: BoxConstraints(maxWidth: math.min(520, w * 0.88)),
              child: _column(
                  context, me ? CrossAxisAlignment.end : CrossAxisAlignment.start),
            ),
          );
      }
    });
    if (speakerLabel != null) {
      content = Semantics(
        container: true,
        label: speakerLabel,
        child: content,
      );
    }
    if (!isNew) return content;
    return LdsBlurIn(
      rise: 8,
      blur: 0,
      duration: LdsMotion.smoothSpringDuration,
      curve: LdsSpringCurve.smooth,
      child: content,
    );
  }

  Widget _bubble(BuildContext context) {
    final c = context.lds;
    final me = role == LdsChatRole.me;
    final style = LdsType.body.copyWith(
      height: 23 / 15,
      color: me
          ? c.textOnAccent
          : role == LdsChatRole.other
              ? c.textStrong
              : c.textDefault,
    );
    final body = DefaultTextStyle.merge(
      style: style,
      child: child ?? Text(text!),
    );
    if (role == LdsChatRole.assistant) return body;
    final bubble = DecoratedBox(
      decoration: BoxDecoration(
        color: me ? c.accent : c.bgFill,
        borderRadius: BorderRadius.only(
          topLeft: const Radius.circular(18),
          topRight: const Radius.circular(18),
          bottomLeft: Radius.circular(me ? 18 : 6),
          bottomRight: Radius.circular(me ? 6 : 18),
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
        child: body,
      ),
    );
    return error == null ? bubble : Opacity(opacity: 0.6, child: bubble);
  }

  Widget _column(BuildContext context, CrossAxisAlignment align) {
    final c = context.lds;
    final children = <Widget>[
      if (name != null)
        Padding(
          padding: const EdgeInsets.only(left: 4),
          child: Text(name!,
              style: LdsType.caption.copyWith(color: c.textSubtle)),
        ),
      for (final s in steps) s,
      _bubble(context),
      if (meta != null)
        Text(meta!, style: LdsType.caption.copyWith(color: c.textMuted)),
      if (error != null)
        Wrap(
          crossAxisAlignment: WrapCrossAlignment.center,
          spacing: 6,
          children: [
            LdsIcon('error', size: 16, color: c.dangerText),
            Text(error!,
                style: LdsType.footnote.copyWith(color: c.dangerText)),
            if (onRetry != null)
              LdsButton(
                label: retryLabel,
                onPressed: onRetry,
                variant: LdsButtonVariant.plain,
                size: LdsButtonSize.sm,
              ),
          ],
        ),
      if (actions.isNotEmpty)
        Transform.translate(
          offset: const Offset(-10, 0),
          child: Row(mainAxisSize: MainAxisSize.min, children: actions),
        ),
    ];
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: align,
      children: [
        for (var i = 0; i < children.length; i++) ...[
          if (i > 0) const SizedBox(height: 6),
          children[i],
        ],
      ],
    );
  }
}

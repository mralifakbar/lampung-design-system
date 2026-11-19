import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';
import 'avatar.dart';
import 'count.dart';

/// One message in an [LdsInboxList]: who, when, subject, the first words,
/// and signals (unread, flagged, labels).
class LdsInboxRow extends StatelessWidget {
  /// Creates an inbox row.
  const LdsInboxRow({
    super.key,
    required this.from,
    required this.time,
    required this.onTap,
    this.subject,
    this.preview,
    this.previewLines = 2,
    this.avatar,
    this.unread = false,
    this.current = false,
    this.flagged = false,
    this.attachment = false,
    this.count = 0,
    this.labels = const <Widget>[],
    this.unreadLabel = 'Belum dibaca',
    this.flaggedLabel = 'Ditandai',
  });

  /// Sender.
  final String from;

  /// When, already formatted ("09.30", "Kemarin").
  final String time;

  /// Opens the message.
  final VoidCallback? onTap;

  /// Subject, one line.
  final String? subject;

  /// First words of the message.
  final String? preview;

  /// Lines of [preview] before it clips.
  final int previewLines;

  /// Sender's avatar, usually an [LdsAvatar] of 40 px.
  final LdsAvatar? avatar;

  /// Not read yet: accent dot, bolder sender and subject.
  final bool unread;

  /// The message that is open now.
  final bool current;

  /// Flagged for follow-up.
  final bool flagged;

  /// Has an attachment.
  final bool attachment;

  /// Unread replies in a chat list; zero hides it.
  final int count;

  /// [LdsBadge]s under the preview.
  final List<Widget> labels;

  /// Announced for an unread message.
  final String unreadLabel;

  /// Announced for a flagged message.
  final String flaggedLabel;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final reduce = context.ldsReduceMotion;
    final semantic = [
      if (unread) unreadLabel,
      from,
      ?subject,
      ?preview,
      time,
      if (flagged) flaggedLabel,
    ].join(', ');
    return LdsPressable(
      onPressed: onTap,
      pressedScale: 1,
      borderRadius: BorderRadius.zero,
      semanticLabel: semantic,
      excludeChildSemantics: true,
      selected: current ? true : null,
      builder: (context, state) => AnimatedContainer(
        duration: context.ldsDuration(LdsMotion.fast),
        curve: LdsMotion.standardCurve,
        constraints: const BoxConstraints(minHeight: 64),
        padding: const EdgeInsets.fromLTRB(20, 12, 16, 12),
        color: current
            ? c.accentTint
            : state.pressed
            ? Color.alphaBlend(c.bgTintStrong, c.bgBase)
            : state.hovered
            ? Color.alphaBlend(c.bgTint, c.bgBase)
            : c.bgBase,
        child: Stack(
          clipBehavior: Clip.none,
          children: [
            if (unread)
              Positioned(
                left: -14,
                top: 6,
                child: Container(
                  width: 8,
                  height: 8,
                  decoration: BoxDecoration(
                    color: c.accent,
                    shape: BoxShape.circle,
                  ),
                ),
              ),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (avatar != null) ...[
                  Padding(
                    padding: const EdgeInsets.only(top: 2),
                    child: avatar,
                  ),
                  const SizedBox(width: 12),
                ],
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Expanded(
                            child: Text(
                              from,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(
                                fontFamily: LdsType.family,
                                fontSize: 15,
                                height: 20 / 15,
                                fontWeight: unread
                                    ? FontWeight.w600
                                    : FontWeight.w500,
                                color: c.textStrong,
                              ),
                            ),
                          ),
                          if (flagged) ...[
                            const SizedBox(width: 8),
                            TweenAnimationBuilder<double>(
                              tween: Tween(begin: reduce ? 1 : 0.6, end: 1),
                              duration: context.ldsDuration(LdsMotion.snappy),
                              curve: LdsSpringCurve.snappy,
                              builder: (context, s, child) =>
                                  Transform.scale(scale: s, child: child),
                              child: LdsIcon(
                                'flag',
                                size: 15,
                                fill: true,
                                color: c.warningText,
                              ),
                            ),
                          ],
                          if (attachment) ...[
                            const SizedBox(width: 8),
                            LdsIcon(
                              'attach_file',
                              size: 15,
                              color: c.textMuted,
                            ),
                          ],
                          const SizedBox(width: 8),
                          Text(
                            time,
                            style: LdsType.caption.copyWith(
                              color: unread ? c.accentText : c.textMuted,
                              fontFeatures: const [
                                FontFeature.tabularFigures(),
                              ],
                            ),
                          ),
                        ],
                      ),
                      if (subject != null) ...[
                        const SizedBox(height: 2),
                        Text(
                          subject!,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: LdsType.subhead.copyWith(
                            height: 20 / 14,
                            color: c.textStrong,
                            fontWeight: unread ? FontWeight.w600 : null,
                          ),
                        ),
                      ],
                      if (preview != null || count > 0) ...[
                        const SizedBox(height: 2),
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Expanded(
                              child: Text(
                                preview ?? '',
                                maxLines: count > 0 ? 1 : previewLines,
                                overflow: TextOverflow.ellipsis,
                                style: LdsType.footnote.copyWith(
                                  height: 18 / 13,
                                  color: c.textSubtle,
                                ),
                              ),
                            ),
                            if (count > 0) ...[
                              const SizedBox(width: 8),
                              LdsCount(count, noun: 'pesan baru'),
                            ],
                          ],
                        ),
                      ],
                      if (labels.isNotEmpty) ...[
                        const SizedBox(height: 6),
                        Wrap(spacing: 6, runSpacing: 6, children: labels),
                      ],
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

/// A column of [LdsInboxRow]s with hairlines between them.
///
/// With [avatars] the hairlines start after the 40 px avatar.
class LdsInboxList extends StatelessWidget {
  /// Creates an inbox list.
  const LdsInboxList({super.key, required this.children, this.avatars = false});

  /// The rows.
  final List<LdsInboxRow> children;

  /// Rows start with an avatar.
  final bool avatars;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        for (var i = 0; i < children.length; i++) ...[
          if (i > 0)
            // The hairline hides next to the open message.
            ColoredBox(
              color: c.bgBase,
              child: Padding(
                padding: EdgeInsetsDirectional.only(start: avatars ? 72 : 20),
                child: Container(
                  height: 0.5,
                  color: children[i].current || children[i - 1].current
                      ? Colors.transparent
                      : c.lineStrong,
                ),
              ),
            ),
          children[i],
        ],
      ],
    );
  }
}

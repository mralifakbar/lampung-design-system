import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../button.dart';
import '../icon.dart';

/// A drop zone with a real Choose button, and the rows of chosen files
/// under it: Unggah foto KTP, Lampiran laporan.
///
/// The button is the main path: [onChoose] opens your file picker (this
/// package adds no picker dependency). Set [dragging] from your own drop
/// target to show the accent state. Put one [LdsFileRow] per chosen file
/// in [files].
class LdsFileInput extends StatelessWidget {
  /// Creates a file input.
  const LdsFileInput({
    super.key,
    required this.onChoose,
    this.title = 'Tarik berkas ke sini',
    this.description = 'PDF, JPG atau PNG, maksimal 5 MB',
    this.buttonLabel = 'Pilih berkas',
    this.icon = 'cloud_upload',
    this.dragging = false,
    this.files = const [],
    this.error,
  });

  /// Opens the file picker. Null disables the input.
  final VoidCallback? onChoose;

  /// Headline in the zone.
  final String title;

  /// Accepted types and size.
  final String? description;

  /// Choose button text.
  final String buttonLabel;

  /// Zone icon (ligature name).
  final String icon;

  /// A file is held over the zone.
  final bool dragging;

  /// Rows for the chosen files, usually [LdsFileRow]s.
  final List<Widget> files;

  /// An error for the whole input (too many files).
  final String? error;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final reduce = context.ldsReduceMotion;
    final zone = AnimatedScale(
      scale: dragging && !reduce ? 1.01 : 1,
      duration: context.ldsDuration(LdsMotion.snappy),
      curve: LdsSpringCurve.snappy,
      child: AnimatedContainer(
        duration: context.ldsDuration(LdsMotion.fast),
        padding: const EdgeInsets.all(28),
        decoration: BoxDecoration(
          color: dragging ? c.accentTint : c.bgBase,
          borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.lg)),
          border: Border.all(
            color: dragging
                ? c.accent
                : error != null
                ? c.danger
                : c.lineStrong,
            width: dragging ? 2 : 1.5,
          ),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            AnimatedSlide(
              offset: dragging && !reduce ? const Offset(0, -0.1) : Offset.zero,
              duration: context.ldsDuration(LdsMotion.snappy),
              curve: LdsSpringCurve.snappy,
              child: LdsIcon(
                icon,
                size: 28,
                color: dragging ? c.accentText : c.textSubtle,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              title,
              textAlign: TextAlign.center,
              style: LdsType.headline.copyWith(color: c.textStrong),
            ),
            if (description != null) ...[
              const SizedBox(height: 6),
              Text(
                description!,
                textAlign: TextAlign.center,
                style: LdsType.subhead.copyWith(color: c.textSubtle),
              ),
            ],
            const SizedBox(height: 14),
            LdsButton(
              label: buttonLabel,
              variant: LdsButtonVariant.secondary,
              icon: 'attach_file',
              onPressed: onChoose,
            ),
          ],
        ),
      ),
    );
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        zone,
        if (error != null) ...[
          const SizedBox(height: 8),
          Semantics(
            liveRegion: true,
            child: Text(
              error!,
              style: LdsType.footnote.copyWith(color: c.dangerText),
            ),
          ),
        ],
        for (final f in files) ...[const SizedBox(height: 6), f],
      ],
    );
  }
}

/// One chosen file: name, size, upload progress or an error, and a way to
/// remove it.
class LdsFileRow extends StatelessWidget {
  /// Creates a file row.
  const LdsFileRow({
    super.key,
    required this.name,
    this.sizeBytes,
    this.progress,
    this.error,
    this.onRemove,
    this.icon = 'description',
    this.removeLabel = 'Hapus berkas',
  });

  /// File name.
  final String name;

  /// Size in bytes, shown as KB or MB.
  final int? sizeBytes;

  /// Upload progress from 0 to 1; null when not uploading.
  final double? progress;

  /// Why the file was refused; turns the row danger.
  final String? error;

  /// Removes the file. Null hides the button.
  final VoidCallback? onRemove;

  /// Leading icon (ligature name).
  final String icon;

  /// Remove button label; the file name is added for screen readers.
  final String removeLabel;

  /// Formats [bytes] as "820 KB" or "2,4 MB".
  static String formatSize(int bytes) {
    if (bytes < 1024) return '$bytes B';
    if (bytes < 1024 * 1024) return '${(bytes / 1024).round()} KB';
    final mb = bytes / (1024 * 1024);
    return '${mb.toStringAsFixed(1).replaceAll('.', ',')} MB';
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final failed = error != null;
    final uploading = progress != null && progress! < 1 && !failed;
    final meta = failed
        ? error!
        : [
            if (sizeBytes != null) formatSize(sizeBytes!),
            if (uploading) '${(progress! * 100).round()}%',
          ].join(' · ');
    return Container(
      constraints: const BoxConstraints(minHeight: 56),
      padding: const EdgeInsets.fromLTRB(12, 8, 4, 8),
      decoration: BoxDecoration(
        color: c.bgFill,
        borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.md)),
      ),
      child: Row(
        children: [
          Container(
            width: 36,
            height: 36,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: c.bgBase,
              borderRadius: const BorderRadius.all(Radius.circular(10)),
            ),
            child: LdsIcon(
              failed ? 'error' : icon,
              color: failed ? c.dangerText : c.accentText,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  name,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: LdsType.subhead.copyWith(
                    color: c.textStrong,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                if (meta.isNotEmpty) ...[
                  const SizedBox(height: 2),
                  Semantics(
                    liveRegion: failed,
                    child: Text(
                      meta,
                      style: LdsType.footnote.copyWith(
                        color: failed ? c.dangerText : c.textSubtle,
                        fontFeatures: const [FontFeature.tabularFigures()],
                      ),
                    ),
                  ),
                ],
                if (uploading) ...[
                  const SizedBox(height: 6),
                  ClipRRect(
                    borderRadius: const BorderRadius.all(Radius.circular(2)),
                    child: TweenAnimationBuilder<double>(
                      tween: Tween(end: progress!.clamp(0.0, 1.0)),
                      duration: context.ldsDuration(LdsMotion.standard),
                      builder: (context, v, _) => LinearProgressIndicator(
                        value: v,
                        minHeight: 4,
                        color: c.accent,
                        backgroundColor: c.bgTrack,
                      ),
                    ),
                  ),
                ],
              ],
            ),
          ),
          if (onRemove != null)
            LdsIconButton(
              icon: 'close',
              semanticLabel: '$removeLabel $name',
              showTooltip: false,
              color: c.textSubtle,
              onPressed: onRemove,
            ),
        ],
      ),
    );
  }
}

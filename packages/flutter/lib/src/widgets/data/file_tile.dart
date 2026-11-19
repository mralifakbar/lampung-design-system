import 'dart:math' as math;

import 'package:flutter/foundation.dart';
import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../button.dart';
import '../icon.dart';
import '../pressable.dart';

/// The kind of item an [LdsFileTile] shows; sets its tone and icon.
enum LdsFileType {
  /// Folder, accent tone, a shorter thumbnail.
  folder,

  /// Text document.
  doc,

  /// Spreadsheet.
  sheet,

  /// Picture.
  image,

  /// Video.
  video,

  /// Audio.
  audio,

  /// Archive.
  archive,
}

/// One file or folder in an [LdsFileGrid]: a tinted thumbnail with the type
/// icon (or a picture), the name in two lines at most, and size and date.
///
/// The checkbox and the more button show on hover and focus, while
/// anything in the grid is selected, and always on touch screens.
class LdsFileTile extends StatefulWidget {
  /// Creates a file tile.
  const LdsFileTile({
    super.key,
    required this.name,
    required this.type,
    this.meta,
    this.image,
    this.onTap,
    this.selected,
    this.onSelectedChanged,
    this.onMore,
    this.selecting = false,
    this.compact = false,
    this.moreLabel = 'Pilihan lain',
  });

  /// The file name.
  final String name;

  /// The kind of file.
  final LdsFileType type;

  /// Size and date, for example "2,4 MB · 12 Nov".
  final String? meta;

  /// A picture that covers the thumbnail.
  final ImageProvider? image;

  /// Opens the file.
  final VoidCallback? onTap;

  /// Whether the tile is ticked; null leaves out the checkbox.
  final bool? selected;

  /// Called when the checkbox changes.
  final ValueChanged<bool>? onSelectedChanged;

  /// Opens the more menu; null leaves out the button.
  final VoidCallback? onMore;

  /// Something in the grid is ticked: keep the checkbox visible.
  final bool selecting;

  /// 72 px thumbnails, for the compact grid.
  final bool compact;

  /// Label of the more button.
  final String moreLabel;

  @override
  State<LdsFileTile> createState() => _LdsFileTileState();
}

class _LdsFileTileState extends State<LdsFileTile> {
  bool _hover = false;
  bool _focus = false;

  static String _icon(LdsFileType t) => switch (t) {
    LdsFileType.folder => 'folder',
    LdsFileType.doc => 'description',
    LdsFileType.sheet => 'grid_view',
    LdsFileType.image => 'image',
    LdsFileType.video => 'movie',
    LdsFileType.audio => 'audio_file',
    LdsFileType.archive => 'folder_zip',
  };

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final tone = switch (widget.type) {
      LdsFileType.folder => c.accent,
      LdsFileType.doc => c.tileBlue,
      LdsFileType.sheet => c.tileGreen,
      LdsFileType.image => c.tileOrange,
      LdsFileType.video => c.tileRed,
      LdsFileType.audio => c.series4,
      LdsFileType.archive => c.tileGray,
    };
    final touch =
        defaultTargetPlatform == TargetPlatform.android ||
        defaultTargetPlatform == TargetPlatform.iOS;
    final selected = widget.selected ?? false;
    final showTools = touch || _hover || _focus || selected || widget.selecting;
    final thumbH = widget.type == LdsFileType.folder
        ? 64.0
        : widget.compact
        ? 72.0
        : 104.0;
    const radius = BorderRadius.all(Radius.circular(LdsRadius.md));

    final open = LdsPressable(
      onPressed: widget.onTap,
      pressedScale: 0.985,
      semanticLabel: [
        widget.name,
        if (widget.meta != null) widget.meta!,
      ].join(', '),
      excludeChildSemantics: true,
      builder: (context, state) => Padding(
        padding: const EdgeInsets.all(8),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              height: thumbH,
              alignment: Alignment.center,
              clipBehavior: Clip.antiAlias,
              decoration: BoxDecoration(
                color: Color.alphaBlend(tone.withValues(alpha: 0.10), c.bgBase),
                borderRadius: const BorderRadius.all(
                  Radius.circular(LdsRadius.sm),
                ),
                image: widget.image == null
                    ? null
                    : DecorationImage(image: widget.image!, fit: BoxFit.cover),
              ),
              child: widget.image == null
                  ? LdsIcon(
                      _icon(widget.type),
                      size: widget.compact ? 28 : 36,
                      color: tone,
                      fill: true,
                    )
                  : null,
            ),
            const SizedBox(height: 10),
            Text(
              widget.name,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                fontFamily: LdsType.family,
                fontSize: 14,
                height: 19 / 14,
                fontWeight: FontWeight.w500,
                color: c.textStrong,
              ),
            ),
            if (widget.meta != null)
              Text(
                widget.meta!,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                  fontFamily: LdsType.family,
                  fontSize: 12,
                  height: 16 / 12,
                  color: c.textSubtle,
                  fontFeatures: const [FontFeature.tabularFigures()],
                ),
              ),
          ],
        ),
      ),
    );

    Widget tool(Widget child) => AnimatedOpacity(
      opacity: showTools ? 1 : 0,
      duration: context.ldsDuration(LdsMotion.fast),
      child: AnimatedScale(
        scale: showTools || context.ldsReduceMotion ? 1 : 0.9,
        duration: context.ldsDuration(LdsMotion.snappy),
        curve: LdsSpringCurve.snappy,
        child: IgnorePointer(ignoring: !showTools, child: child),
      ),
    );

    return Focus(
      canRequestFocus: false,
      skipTraversal: true,
      onFocusChange: (v) => setState(() => _focus = v),
      child: MouseRegion(
        onEnter: (_) => setState(() => _hover = true),
        onExit: (_) => setState(() => _hover = false),
        child: AnimatedContainer(
          duration: context.ldsDuration(LdsMotion.fast),
          decoration: BoxDecoration(
            color: selected ? c.accentTint : c.bgBase,
            borderRadius: radius,
            border: Border.all(
              color: selected
                  ? c.accent
                  : _hover || _focus
                  ? c.lineStrong
                  : c.line,
              width: selected ? 1.5 : 1,
            ),
          ),
          child: Stack(
            children: [
              open,
              if (widget.selected != null)
                Positioned(
                  left: 2,
                  top: 2,
                  child: tool(
                    Checkbox(
                      value: selected,
                      onChanged: widget.onSelectedChanged == null
                          ? null
                          : (v) => widget.onSelectedChanged!(v ?? false),
                      semanticLabel: 'Pilih ${widget.name}',
                    ),
                  ),
                ),
              if (widget.onMore != null)
                Positioned(
                  right: 2,
                  top: 2,
                  child: tool(
                    LdsIconButton(
                      icon: 'more_horiz',
                      semanticLabel: '${widget.moreLabel}: ${widget.name}',
                      variant: LdsIconButtonVariant.filled,
                      onPressed: widget.onMore,
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

/// A responsive grid of [LdsFileTile]s, announced as a list.
class LdsFileGrid extends StatelessWidget {
  /// Creates a file grid.
  const LdsFileGrid({
    super.key,
    required this.children,
    this.compact = false,
    this.semanticLabel,
  });

  /// The tiles.
  final List<Widget> children;

  /// 140 px minimum columns instead of 168.
  final bool compact;

  /// Names the list.
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final min = compact ? 140.0 : 168.0;
    return Semantics(
      label: semanticLabel,
      container: true,
      child: LayoutBuilder(
        builder: (context, box) {
          const gap = 12.0;
          final width = box.maxWidth.isFinite ? box.maxWidth : min;
          final cols = math.max(1, ((width + gap) / (min + gap)).floor());
          final w = (width - gap * (cols - 1)) / cols;
          return Wrap(
            spacing: gap,
            runSpacing: gap,
            children: [
              for (final child in children) SizedBox(width: w, child: child),
            ],
          );
        },
      ),
    );
  }
}

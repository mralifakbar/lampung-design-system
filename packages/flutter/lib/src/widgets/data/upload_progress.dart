import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';

/// A drop zone that reports an upload by tracing its own edge.
///
/// While [progress] is set, a 2 px accent line runs around the edge at the
/// real speed of the upload and a percent pill sits in the corner. At
/// [complete] both turn green. Under reduced motion the trace and pill
/// still update, each change in 120 ms.
class LdsUploadProgress extends StatelessWidget {
  /// Creates an upload drop zone.
  const LdsUploadProgress({
    super.key,
    this.progress,
    this.complete = false,
    this.title = 'Seret berkas ke sini',
    this.body,
    this.icon = 'cloud_upload',
    this.action,
    this.semanticLabel = 'Unggahan',
  });

  /// From 0 to 1 while uploading; null when idle.
  final double? progress;

  /// The upload finished.
  final bool complete;

  /// Headline in the zone.
  final String title;

  /// Detail under the headline, for example "PDF atau JPG, maks. 5 MB".
  final String? body;

  /// Glyph above the headline.
  final String icon;

  /// A button that opens the file picker.
  final Widget? action;

  /// Names the progress for screen readers.
  final String semanticLabel;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final reduce = context.ldsReduceMotion;
    final active = progress != null || complete;
    final v = complete ? 1.0 : (progress ?? 0).clamp(0.0, 1.0);
    final tone = complete ? c.success : c.accent;
    const radius = LdsRadius.lg;
    final pct = '${(v * 100).round()}%';

    return Stack(
      children: [
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(28),
          decoration: BoxDecoration(
            color: c.bgBase,
            borderRadius: const BorderRadius.all(Radius.circular(radius)),
            border: Border.all(color: c.lineStrong, width: 1.5),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              LdsIcon(icon, size: 28, color: c.textSubtle),
              const SizedBox(height: 6),
              Text(
                title,
                textAlign: TextAlign.center,
                style: LdsType.headline.copyWith(color: c.textStrong),
              ),
              if (body != null) ...[
                const SizedBox(height: 6),
                Text(
                  body!,
                  textAlign: TextAlign.center,
                  style: LdsType.subhead.copyWith(color: c.textSubtle),
                ),
              ],
              if (action != null) ...[const SizedBox(height: 14), action!],
            ],
          ),
        ),
        Positioned.fill(
          child: IgnorePointer(
            child: AnimatedOpacity(
              opacity: active ? 1 : 0,
              duration: reduce
                  ? LdsMotion.instant
                  : const Duration(milliseconds: 300),
              curve: LdsMotion.standardCurve,
              child: TweenAnimationBuilder<double>(
                tween: Tween(end: v),
                duration: reduce
                    ? LdsMotion.instant
                    : const Duration(milliseconds: 200),
                builder: (context, x, _) => TweenAnimationBuilder<Color?>(
                  tween: ColorTween(end: tone),
                  duration: context.ldsDuration(LdsMotion.standard),
                  builder: (context, color, _) => CustomPaint(
                    painter: _TracePainter(x, color ?? tone, radius),
                  ),
                ),
              ),
            ),
          ),
        ),
        Positioned(
          top: 12,
          right: 12,
          child: Semantics(
            label: semanticLabel,
            value: active ? pct : null,
            liveRegion: active,
            child: AnimatedOpacity(
              opacity: active ? 1 : 0,
              duration: reduce ? LdsMotion.instant : LdsMotion.fast,
              child: AnimatedSlide(
                offset: active || reduce ? Offset.zero : const Offset(0, -0.42),
                duration: reduce
                    ? LdsMotion.instant
                    : const Duration(milliseconds: 300),
                curve: LdsSpringCurve.snappy,
                child: AnimatedContainer(
                  duration: context.ldsDuration(LdsMotion.standard),
                  height: 24,
                  padding: const EdgeInsets.symmetric(horizontal: 9),
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: complete ? c.successTint : c.accentTint,
                    borderRadius: const BorderRadius.all(Radius.circular(12)),
                  ),
                  child: Text(
                    pct,
                    style: TextStyle(
                      fontFamily: LdsType.family,
                      fontSize: 12,
                      height: 1,
                      fontWeight: FontWeight.w600,
                      color: complete ? c.successText : c.accentText,
                      fontFeatures: const [FontFeature.tabularFigures()],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class _TracePainter extends CustomPainter {
  _TracePainter(this.value, this.color, this.radius);

  final double value;
  final Color color;
  final double radius;

  @override
  void paint(Canvas canvas, Size size) {
    if (value <= 0) return;
    final rrect = RRect.fromRectAndRadius(
      (Offset.zero & size).deflate(0.75),
      Radius.circular(radius),
    );
    // Start at the top middle and run clockwise.
    final path = Path()
      ..moveTo(size.width / 2, rrect.top)
      ..lineTo(rrect.right - radius, rrect.top)
      ..arcToPoint(
        Offset(rrect.right, rrect.top + radius),
        radius: Radius.circular(radius),
      )
      ..lineTo(rrect.right, rrect.bottom - radius)
      ..arcToPoint(
        Offset(rrect.right - radius, rrect.bottom),
        radius: Radius.circular(radius),
      )
      ..lineTo(rrect.left + radius, rrect.bottom)
      ..arcToPoint(
        Offset(rrect.left, rrect.bottom - radius),
        radius: Radius.circular(radius),
      )
      ..lineTo(rrect.left, rrect.top + radius)
      ..arcToPoint(
        Offset(rrect.left + radius, rrect.top),
        radius: Radius.circular(radius),
      )
      ..close();
    final metric = path.computeMetrics().first;
    final part = metric.extractPath(0, metric.length * value);
    canvas.drawPath(
      part,
      Paint()
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2
        ..strokeCap = StrokeCap.round
        ..color = color,
    );
  }

  @override
  bool shouldRepaint(_TracePainter old) =>
      old.value != value || old.color != color || old.radius != radius;
}

import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:lampung_design_system/lampung_design_system.dart';

/// One widget shown in the gallery: its class name, an Indonesian title and
/// a builder for a live example.
class GalleryEntry {
  const GalleryEntry(this.name, this.title, this.builder, {this.bleed = false});

  final String name;
  final String title;
  final WidgetBuilder builder;

  /// Drops the inner padding of the example box, for wide widgets.
  final bool bleed;
}

/// A group of entries, matching one barrel of the package.
class GalleryGroup {
  const GalleryGroup({
    required this.title,
    required this.icon,
    required this.summary,
    required this.entries,
  });

  final String title;
  final String icon;
  final String summary;
  final List<GalleryEntry> entries;
}

/// Holds one value of local state for an example.
class Hold<T> extends StatefulWidget {
  const Hold({super.key, required this.initial, required this.builder});

  final T initial;
  final Widget Function(BuildContext context, T value, ValueChanged<T> set)
      builder;

  @override
  State<Hold<T>> createState() => _HoldState<T>();
}

class _HoldState<T> extends State<Hold<T>> {
  late T _value = widget.initial;

  @override
  Widget build(BuildContext context) =>
      widget.builder(context, _value, (v) => setState(() => _value = v));
}

/// Shows a short confirmation that an example action ran.
void galleryToast(BuildContext context, String message) {
  ScaffoldMessenger.of(context)
    ..hideCurrentSnackBar()
    ..showSnackBar(SnackBar(content: Text(message)));
}

/// A small caption under or between example parts.
class DemoNote extends StatelessWidget {
  const DemoNote(this.text, {super.key});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Text(text,
        style: LdsType.footnote.copyWith(color: context.lds.textSubtle));
  }
}

/// Vertical stack with a fixed gap, for examples with several parts.
class DemoColumn extends StatelessWidget {
  const DemoColumn({super.key, required this.children, this.gap = 12});

  final List<Widget> children;
  final double gap;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        for (var i = 0; i < children.length; i++) ...[
          if (i > 0) SizedBox(height: gap),
          children[i],
        ],
      ],
    );
  }
}

/// Fixed "today" so dates in examples stay stable.
final galleryToday = DateTime(2026, 11, 17);

/// Kecamatan in Bandar Lampung used across examples.
const kecamatan = <String>[
  'Kedaton',
  'Way Halim',
  'Rajabasa',
  'Sukarame',
  'Tanjung Karang Pusat',
  'Teluk Betung Selatan',
  'Kemiling',
];

Future<ImageProvider>? _photo;

/// A drawn stand-in for a citizen's report photo (a road with a pothole),
/// rendered once and cached, so examples need no asset files.
Future<ImageProvider> galleryPhoto() => _photo ??= _drawPhoto();

Future<ImageProvider> _drawPhoto() async {
  const w = 640.0, h = 480.0;
  final rec = ui.PictureRecorder();
  final canvas = Canvas(rec);
  canvas.drawRect(
    const Rect.fromLTWH(0, 0, w, h * 0.45),
    Paint()
      ..shader = ui.Gradient.linear(const Offset(0, 0), const Offset(0, h * 0.45),
          [const Color(0xFF8EC5E8), const Color(0xFFD9EEF7)]),
  );
  canvas.drawRect(const Rect.fromLTWH(0, h * 0.4, w, h * 0.6),
      Paint()..color = const Color(0xFF4F8A3C));
  final road = Path()
    ..moveTo(w * 0.42, h * 0.4)
    ..lineTo(w * 0.58, h * 0.4)
    ..lineTo(w, h)
    ..lineTo(0, h)
    ..close();
  canvas.drawPath(road, Paint()..color = const Color(0xFF5B5F66));
  final dash = Paint()
    ..color = const Color(0xFFF2F2F2)
    ..strokeWidth = 6;
  for (var i = 0; i < 6; i++) {
    final t0 = 0.42 + i * 0.1, t1 = t0 + 0.05;
    canvas.drawLine(Offset(w / 2, h * t0), Offset(w / 2, h * t1), dash);
  }
  canvas.drawOval(
      Rect.fromCenter(center: const Offset(w * 0.38, h * 0.78), width: 170, height: 60),
      Paint()..color = const Color(0xFF3A3328));
  canvas.drawOval(
      Rect.fromCenter(center: const Offset(w * 0.38, h * 0.785), width: 120, height: 34),
      Paint()..color = const Color(0xFF6F8FA8));
  final img = await rec.endRecording().toImage(w.toInt(), h.toInt());
  final bytes = await img.toByteData(format: ui.ImageByteFormat.png);
  return MemoryImage(bytes!.buffer.asUint8List());
}

/// Builds [builder] once the drawn photo is ready.
class PhotoBuilder extends StatelessWidget {
  const PhotoBuilder({super.key, required this.builder, this.height = 160});

  final Widget Function(BuildContext context, ImageProvider image) builder;
  final double height;

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<ImageProvider>(
      future: galleryPhoto(),
      builder: (context, snap) => snap.hasData
          ? builder(context, snap.data!)
          : SizedBox(height: height),
    );
  }
}

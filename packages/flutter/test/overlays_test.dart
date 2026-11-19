import 'package:flutter/gestures.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:lampung_design_system/src/overlays.dart';
import 'package:lampung_design_system/src/theme.dart';
import 'package:material_ui/material_ui.dart';

import 'helpers.dart';

/// Pumps [child] in light and dark and fails on any exception.
Future<void> expectBothThemes(WidgetTester tester, Widget child) async {
  for (final dark in [false, true]) {
    await tester.pumpWidget(wrap(child, dark: dark));
    await tester.pumpAndSettle();
    expect(tester.takeException(), isNull);
  }
}

/// A trigger button that runs [onTap] with a context under the app.
Widget trigger(String label, void Function(BuildContext context) onTap) =>
    Builder(
      builder: (context) =>
          TextButton(onPressed: () => onTap(context), child: Text(label)),
    );

// A 1x1 transparent PNG.
final Uint8List _png = Uint8List.fromList(<int>[
  0x89,
  0x50,
  0x4E,
  0x47,
  0x0D,
  0x0A,
  0x1A,
  0x0A,
  0x00,
  0x00,
  0x00,
  0x0D,
  0x49,
  0x48,
  0x44,
  0x52,
  0x00,
  0x00,
  0x00,
  0x01,
  0x00,
  0x00,
  0x00,
  0x01,
  0x08,
  0x06,
  0x00,
  0x00,
  0x00,
  0x1F,
  0x15,
  0xC4,
  0x89,
  0x00,
  0x00,
  0x00,
  0x0A,
  0x49,
  0x44,
  0x41,
  0x54,
  0x78,
  0x9C,
  0x63,
  0x00,
  0x01,
  0x00,
  0x00,
  0x05,
  0x00,
  0x01,
  0x0D,
  0x0A,
  0x2D,
  0xB4,
  0x00,
  0x00,
  0x00,
  0x00,
  0x49,
  0x45,
  0x4E,
  0x44,
  0xAE,
  0x42,
  0x60,
  0x82,
]);

void main() {
  group('dialog', () {
    testWidgets('renders in light and dark', (tester) async {
      await expectBothThemes(
        tester,
        LdsDialog(
          title: 'Simpan perubahan izin?',
          body: 'Perubahan akan terlihat oleh petugas.',
          icon: 'info',
          onClose: () {},
          actions: const [Text('Batal'), Text('Simpan')],
        ),
      );
    });

    testWidgets('opens and closes with Escape', (tester) async {
      await tester.pumpWidget(
        wrap(
          trigger('Buka', (context) {
            showLdsDialog<void>(
              context: context,
              builder: (_) => const LdsDialog(title: 'Ubah alamat'),
            );
          }),
        ),
      );
      await tester.tap(find.text('Buka'));
      await tester.pumpAndSettle();
      expect(find.text('Ubah alamat'), findsOneWidget);
      await tester.sendKeyEvent(LogicalKeyboardKey.escape);
      await tester.pumpAndSettle();
      expect(find.text('Ubah alamat'), findsNothing);
    });
  });

  group('alert dialog', () {
    testWidgets('renders in light and dark', (tester) async {
      await expectBothThemes(
        tester,
        LdsAlertDialog(
          title: 'Hapus laporan #1024?',
          body: 'Laporan tidak bisa dipulihkan.',
          confirmLabel: 'Hapus laporan',
          cancelLabel: 'Batal',
          onConfirm: () {},
          onCancel: () {},
        ),
      );
    });

    testWidgets('confirm completes with true', (tester) async {
      bool? result;
      await tester.pumpWidget(
        wrap(
          trigger('Hapus', (context) async {
            result = await showLdsAlertDialog(
              context: context,
              title: 'Hapus laporan #1024?',
              confirmLabel: 'Hapus laporan',
              cancelLabel: 'Batal',
            );
          }),
        ),
      );
      await tester.tap(find.text('Hapus'));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Hapus laporan'));
      await tester.pumpAndSettle();
      expect(result, isTrue);
    });
  });

  group('modal', () {
    testWidgets('renders in light and dark', (tester) async {
      await expectBothThemes(
        tester,
        LdsModal(
          title: 'Detail permohonan',
          onClose: () {},
          actions: const [Text('Tutup')],
          child: const Text('Izin usaha mikro, diajukan 12 Mei.'),
        ),
      );
    });

    testWidgets('opens centered and closes with its close button', (
      tester,
    ) async {
      await tester.pumpWidget(
        wrap(
          trigger('Lihat', (context) {
            showLdsModal<void>(
              context: context,
              title: 'Detail permohonan',
              closeLabel: 'Tutup',
              body: (_) => const Text('Izin usaha mikro'),
            );
          }),
        ),
      );
      await tester.tap(find.text('Lihat'));
      await tester.pumpAndSettle();
      expect(find.byType(LdsModal), findsOneWidget);
      await tester.tap(find.bySemanticsLabel('Tutup').last);
      await tester.pumpAndSettle();
      expect(find.byType(LdsModal), findsNothing);
    });

    testWidgets('becomes a sheet on a phone', (tester) async {
      tester.view.physicalSize = const Size(375, 800);
      tester.view.devicePixelRatio = 1;
      addTearDown(tester.view.reset);
      await tester.pumpWidget(
        wrap(
          trigger('Lihat', (context) {
            showLdsModal<void>(
              context: context,
              title: 'Detail permohonan',
              body: (_) => const Text('Izin usaha mikro'),
            );
          }),
        ),
      );
      await tester.tap(find.text('Lihat'));
      await tester.pumpAndSettle();
      expect(find.byType(LdsSheet), findsOneWidget);
    });
  });

  group('sheet', () {
    testWidgets('renders in light and dark', (tester) async {
      await expectBothThemes(
        tester,
        LdsSheet(
          title: 'Pilih jadwal',
          onClose: () {},
          child: const Text('Senin, 08.00'),
        ),
      );
    });

    testWidgets('drag down dismisses', (tester) async {
      await tester.pumpWidget(
        wrap(
          trigger('Jadwal', (context) {
            showLdsSheet<void>(
              context: context,
              builder: (_) => const LdsSheet(
                title: 'Pilih jadwal',
                child: SizedBox(height: 200, child: Text('Senin, 08.00')),
              ),
            );
          }),
        ),
      );
      await tester.tap(find.text('Jadwal'));
      await tester.pumpAndSettle();
      expect(find.text('Pilih jadwal'), findsOneWidget);
      await tester.fling(find.text('Pilih jadwal'), const Offset(0, 300), 1500);
      await tester.pumpAndSettle();
      expect(find.text('Pilih jadwal'), findsNothing);
    });
  });

  group('drawer', () {
    testWidgets('renders in light and dark', (tester) async {
      await expectBothThemes(
        tester,
        SizedBox(
          height: 400,
          child: LdsDrawer(
            title: 'Filter laporan',
            onClose: () {},
            actions: const [Text('Atur ulang'), Text('Terapkan')],
            child: const Text('Status: Diproses'),
          ),
        ),
      );
    });

    testWidgets('scrim tap closes', (tester) async {
      await tester.pumpWidget(
        wrap(
          trigger('Filter', (context) {
            showLdsDrawer<void>(
              context: context,
              builder: (_) => const LdsDrawer(
                title: 'Filter laporan',
                child: Text('Status'),
              ),
            );
          }),
        ),
      );
      await tester.tap(find.text('Filter'));
      await tester.pumpAndSettle();
      expect(find.text('Filter laporan'), findsOneWidget);
      await tester.tapAt(const Offset(20, 300));
      await tester.pumpAndSettle();
      expect(find.text('Filter laporan'), findsNothing);
    });
  });

  group('popover', () {
    Widget popover() => LdsPopover(
      semanticLabel: 'Info retribusi',
      builder: (context, c) =>
          TextButton(onPressed: c.toggle, child: const Text('Info')),
      contentBuilder: (context, c) =>
          const Text('Retribusi dibayar paling lambat tanggal 10.'),
    );

    testWidgets('renders in light and dark', (tester) async {
      await expectBothThemes(tester, popover());
      await tester.tap(find.text('Info'));
      await tester.pumpAndSettle();
      expect(tester.takeException(), isNull);
    });

    testWidgets('opens on press and closes on outside tap', (tester) async {
      await tester.pumpWidget(wrap(popover()));
      await tester.tap(find.text('Info'));
      await tester.pumpAndSettle();
      expect(find.textContaining('Retribusi'), findsOneWidget);
      await tester.tapAt(const Offset(5, 5));
      await tester.pumpAndSettle();
      expect(find.textContaining('Retribusi'), findsNothing);
    });
  });

  group('tooltip', () {
    Widget tip() => const LdsTooltip(
      message: 'Cari layanan',
      shortcut: 'Ctrl+K',
      child: Icon(Icons.search),
    );

    testWidgets('renders in light and dark', (tester) async {
      await expectBothThemes(tester, tip());
    });

    testWidgets('shows on long press', (tester) async {
      await tester.pumpWidget(wrap(tip()));
      await tester.longPress(find.byType(Icon));
      await tester.pump(const Duration(milliseconds: 300));
      expect(find.textContaining('Cari layanan'), findsOneWidget);
      await tester.pumpAndSettle(const Duration(seconds: 2));
    });
  });

  group('hover card', () {
    Widget card() => const LdsHoverCard(
      card: Text('Dinas Layanan Kota Contoh, buka 08.00 sampai 15.00'),
      child: Text('Dinas Layanan'),
    );

    testWidgets('renders in light and dark', (tester) async {
      await expectBothThemes(tester, card());
    });

    testWidgets('shows after hovering', (tester) async {
      await tester.pumpWidget(wrap(card()));
      final mouse = await tester.createGesture(kind: PointerDeviceKind.mouse);
      await mouse.addPointer(location: Offset.zero);
      addTearDown(mouse.removePointer);
      await mouse.moveTo(tester.getCenter(find.text('Dinas Layanan')));
      await tester.pump(const Duration(milliseconds: 700));
      await tester.pumpAndSettle();
      expect(find.textContaining('buka 08.00'), findsOneWidget);
      await mouse.moveTo(const Offset(1, 1));
      await tester.pump(const Duration(milliseconds: 200));
      await tester.pumpAndSettle();
      expect(find.textContaining('buka 08.00'), findsNothing);
    });
  });

  group('toast', () {
    testWidgets('renders in light and dark', (tester) async {
      await expectBothThemes(
        tester,
        LdsToast(
          title: 'Laporan diarsipkan',
          body: 'Pindah dari kotak masuk.',
          icon: 'inventory_2',
          actionLabel: 'Urungkan',
          onAction: () {},
          remaining: 0.5,
        ),
      );
    });

    testWidgets('shows, then leaves by itself', (tester) async {
      await tester.pumpWidget(
        wrap(
          trigger('Kirim', (context) {
            LdsToast.show(
              context,
              title: 'Laporan terkirim',
              icon: 'check_circle',
            );
          }),
        ),
      );
      await tester.tap(find.text('Kirim'));
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 600));
      expect(find.text('Laporan terkirim'), findsOneWidget);
      await tester.pump(const Duration(seconds: 4));
      await tester.pumpAndSettle();
      expect(find.text('Laporan terkirim'), findsNothing);
    });

    testWidgets('undo morphs the title', (tester) async {
      var undone = false;
      await tester.pumpWidget(
        wrap(
          trigger('Arsipkan', (context) {
            LdsToast.show(
              context,
              title: 'Laporan diarsipkan',
              actionLabel: 'Urungkan',
              onAction: () => undone = true,
              actionResultTitle: 'Laporan dipulihkan',
            );
          }),
        ),
      );
      await tester.tap(find.text('Arsipkan'));
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 600));
      await tester.tap(find.text('Urungkan'));
      await tester.pump(const Duration(milliseconds: 300));
      expect(undone, isTrue);
      expect(find.text('Laporan dipulihkan'), findsOneWidget);
      await tester.pump(const Duration(seconds: 2));
      await tester.pumpAndSettle();
      expect(find.text('Laporan dipulihkan'), findsNothing);
    });
  });

  group('banner', () {
    testWidgets('renders in light and dark', (tester) async {
      await expectBothThemes(
        tester,
        LdsBanner(
          message: 'Anda sedang offline. Perubahan disimpan di perangkat.',
          icon: 'cloud_off',
          actionLabel: 'Coba lagi',
          onAction: () {},
          onClose: () {},
        ),
      );
    });

    testWidgets('collapses when hidden', (tester) async {
      Widget banner(bool visible) => LdsBanner(
        message: 'Pemeliharaan sistem pukul 22.00',
        visible: visible,
      );
      await tester.pumpWidget(wrap(banner(true)));
      expect(find.text('Pemeliharaan sistem pukul 22.00'), findsOneWidget);
      await tester.pumpWidget(wrap(banner(false)));
      await tester.pumpAndSettle();
      expect(find.text('Pemeliharaan sistem pukul 22.00'), findsNothing);
    });
  });

  group('menus', () {
    testWidgets('menu panel renders in light and dark', (tester) async {
      await expectBothThemes(
        tester,
        LdsMenu(
          entries: [
            const LdsMenuLabel('Urutkan'),
            LdsMenuItem(label: 'Terbaru', checked: true, onSelected: () {}),
            LdsMenuItem(
              label: 'Unduh PDF',
              icon: 'download',
              shortcut: 'Ctrl+D',
              onSelected: () {},
            ),
            const LdsMenuDivider(),
            LdsMenuItem(
              label: 'Hapus',
              icon: 'delete',
              destructive: true,
              onSelected: () {},
            ),
          ],
        ),
      );
    });

    testWidgets('dropdown runs a command and closes', (tester) async {
      var ran = false;
      await tester.pumpWidget(
        wrap(
          LdsDropdownMenu(
            entries: [
              LdsMenuItem(label: 'Unduh PDF', onSelected: () => ran = true),
            ],
            builder: (context, c) =>
                TextButton(onPressed: c.toggle, child: const Text('Tindakan')),
          ),
        ),
      );
      await tester.tap(find.text('Tindakan'));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Unduh PDF'));
      await tester.pumpAndSettle();
      expect(ran, isTrue);
      expect(find.text('Unduh PDF'), findsNothing);
    });

    testWidgets('context menu opens on right-click', (tester) async {
      await expectBothThemes(
        tester,
        LdsContextMenu(
          entries: [LdsMenuItem(label: 'Ganti nama', onSelected: () {})],
          child: const SizedBox(
            width: 200,
            height: 100,
            child: Text('Surat izin.pdf'),
          ),
        ),
      );
      await tester.tap(find.text('Surat izin.pdf'), buttons: kSecondaryButton);
      await tester.pumpAndSettle();
      expect(find.text('Ganti nama'), findsOneWidget);
      await tester.sendKeyEvent(LogicalKeyboardKey.escape);
      await tester.pumpAndSettle();
      expect(find.text('Ganti nama'), findsNothing);
    });

    testWidgets('menubar opens a menu', (tester) async {
      await expectBothThemes(
        tester,
        LdsMenubar(
          menus: [
            LdsMenubarMenu(
              label: 'Berkas',
              entries: [
                LdsMenuItem(
                  label: 'Simpan',
                  shortcut: 'Ctrl+S',
                  onSelected: () {},
                ),
              ],
            ),
            LdsMenubarMenu(
              label: 'Ubah',
              entries: [LdsMenuItem(label: 'Urungkan', onSelected: () {})],
            ),
          ],
        ),
      );
      await tester.tap(find.text('Berkas'));
      await tester.pumpAndSettle();
      expect(find.text('Simpan'), findsOneWidget);
      await tester.tap(find.text('Berkas'));
      await tester.pumpAndSettle();
      expect(find.text('Simpan'), findsNothing);
    });
  });

  group('command palette', () {
    final commands = [
      LdsCommand(
        label: 'Buat laporan baru',
        icon: 'add',
        group: 'Tindakan',
        onRun: () {},
      ),
      LdsCommand(
        label: 'Cek status izin',
        icon: 'search',
        group: 'Halaman',
        onRun: () {},
      ),
    ];

    testWidgets('renders in light and dark', (tester) async {
      await expectBothThemes(
        tester,
        LdsCommandPalette(commands: commands, onSelected: (_) {}),
      );
    });

    testWidgets('filters and runs with Enter', (tester) async {
      var ran = '';
      await tester.pumpWidget(
        wrap(
          trigger('Perintah', (context) {
            showLdsCommandPalette(
              context: context,
              placeholder: 'Cari perintah',
              commands: [
                LdsCommand(
                  label: 'Buat laporan baru',
                  onRun: () => ran = 'buat',
                ),
                LdsCommand(label: 'Cek status izin', onRun: () => ran = 'cek'),
              ],
            );
          }),
        ),
      );
      await tester.tap(find.text('Perintah'));
      await tester.pumpAndSettle();
      await tester.enterText(find.byType(TextField), 'status');
      await tester.pump();
      expect(find.text('Buat laporan baru'), findsNothing);
      await tester.testTextInput.receiveAction(TextInputAction.go);
      await tester.pumpAndSettle();
      expect(ran, 'cek');
    });
  });

  group('coachmark', () {
    testWidgets('card renders in light and dark', (tester) async {
      await expectBothThemes(
        tester,
        LdsCoachmark(
          step: 'Langkah 1 dari 2',
          title: 'Saring menurut kecamatan',
          body: 'Lihat laporan dari wilayah Anda saja.',
          nextLabel: 'Lanjut',
          onNext: () {},
          skipLabel: 'Lewati',
          onSkip: () {},
        ),
      );
    });

    testWidgets('tour walks through its steps', (tester) async {
      final a = GlobalKey();
      final b = GlobalKey();
      bool? finished;
      await tester.pumpWidget(
        wrap(
          LdsCoachmarkTour(
            active: true,
            onFinish: (done) => finished = done,
            nextLabel: 'Lanjut',
            doneLabel: 'Selesai',
            skipLabel: 'Lewati',
            steps: [
              LdsCoachmarkStep(target: a, title: 'Saring laporan'),
              LdsCoachmarkStep(target: b, title: 'Buat laporan'),
            ],
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text('Filter', key: a),
                Text('Baru', key: b),
              ],
            ),
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.text('Saring laporan'), findsOneWidget);
      await tester.tap(find.text('Lanjut'));
      await tester.pumpAndSettle();
      expect(find.text('Buat laporan'), findsOneWidget);
      await tester.tap(find.text('Selesai'));
      await tester.pumpAndSettle();
      expect(finished, isTrue);
      expect(find.text('Buat laporan'), findsNothing);
    });
  });

  group('spotlight', () {
    testWidgets('renders and its action runs', (tester) async {
      var pressed = false;
      await expectBothThemes(
        tester,
        LdsSpotlight(
          eyebrow: 'Langkah berikutnya',
          eyebrowIcon: 'flag',
          title: 'Lengkapi data KTP',
          body: 'Permohonan diproses setelah data lengkap.',
          actions: [
            TextButton(
              onPressed: () => pressed = true,
              child: const Text('Lengkapi'),
            ),
          ],
        ),
      );
      await tester.tap(find.text('Lengkapi'));
      expect(pressed, isTrue);
    });
  });

  group('lightbox', () {
    Widget box() => SizedBox(
      width: 160,
      child: LdsLightbox(
        image: MemoryImage(_png),
        semanticLabel: 'Jalan berlubang di Jalan Contoh',
        caption: 'Foto laporan warga',
        closeLabel: 'Tutup',
      ),
    );

    testWidgets('renders in light and dark', (tester) async {
      await expectBothThemes(tester, box());
    });

    testWidgets('opens and closes', (tester) async {
      await tester.pumpWidget(wrap(box()));
      await tester.tap(find.byType(LdsLightbox));
      await tester.pumpAndSettle();
      expect(find.text('Foto laporan warga'), findsOneWidget);
      await tester.tap(find.bySemanticsLabel('Tutup').last);
      await tester.pumpAndSettle();
      expect(find.text('Foto laporan warga'), findsNothing);
    });
  });

  group('confirm in place', () {
    Widget pill({VoidCallback? onUndo, Future<void> Function()? work}) =>
        LdsConfirmInPlace(
          icon: 'delete',
          armLabel: 'Hapus 3 berkas',
          question: 'Hapus 3 berkas?',
          confirmLabel: 'Hapus',
          cancelLabel: 'Batal',
          busyLabel: 'Menghapus',
          doneLabel: '3 berkas terhapus',
          undoLabel: 'Urungkan',
          onUndo: onUndo,
          onConfirm: work ?? () async {},
        );

    testWidgets('renders in light and dark', (tester) async {
      await expectBothThemes(tester, pill(onUndo: () {}));
    });

    testWidgets('walks rest, ask, busy, done', (tester) async {
      var undone = false;
      await tester.pumpWidget(wrap(pill(onUndo: () => undone = true)));
      await tester.tap(find.text('Hapus 3 berkas'));
      await tester.pumpAndSettle();
      expect(find.text('Hapus 3 berkas?'), findsOneWidget);
      await tester.pump(const Duration(milliseconds: 300));
      await tester.runAsync(
        () => Future<void>.delayed(const Duration(milliseconds: 300)),
      );
      await tester.tap(find.text('Hapus'));
      await tester.pump();
      expect(find.text('Menghapus'), findsOneWidget);
      await tester.pump(const Duration(milliseconds: 700));
      await tester.pumpAndSettle();
      expect(find.text('3 berkas terhapus'), findsOneWidget);
      await tester.tap(find.text('Urungkan'));
      await tester.pumpAndSettle();
      expect(undone, isTrue);
      expect(find.text('Hapus 3 berkas'), findsOneWidget);
    });
  });

  group('hold to confirm', () {
    testWidgets('renders in light and dark', (tester) async {
      await expectBothThemes(
        tester,
        LdsHoldToConfirm(label: 'Tahan untuk mengirim', onConfirmed: () {}),
      );
    });

    testWidgets('confirms only after a full hold', (tester) async {
      var count = 0;
      await tester.pumpWidget(
        wrap(
          LdsHoldToConfirm(
            label: 'Tahan untuk mengirim',
            onConfirmed: () => count++,
          ),
        ),
      );
      final center = tester.getCenter(find.text('Tahan untuk mengirim'));
      var g = await tester.startGesture(center);
      await tester.pump(const Duration(milliseconds: 500));
      await g.up();
      await tester.pumpAndSettle();
      expect(count, 0);
      g = await tester.startGesture(center);
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 1300));
      await g.up();
      await tester.pumpAndSettle();
      expect(count, 1);
    });
  });

  group('slide to confirm', () {
    testWidgets('renders in light and dark', (tester) async {
      await expectBothThemes(
        tester,
        LdsSlideToConfirm(
          label: 'Geser untuk mengirim laporan',
          knobLabel: 'Kirim laporan, tekan Enter',
          onConfirmed: () {},
        ),
      );
    });

    testWidgets('commits past the end', (tester) async {
      var done = false;
      await tester.pumpWidget(
        wrap(
          LdsSlideToConfirm(
            label: 'Geser untuk mengirim laporan',
            doneLabel: 'Laporan terkirim',
            knobLabel: 'Kirim laporan, tekan Enter',
            onConfirmed: () => done = true,
          ),
        ),
      );
      await tester.drag(
        find.bySemanticsLabel('Kirim laporan, tekan Enter'),
        const Offset(320, 0),
      );
      await tester.pumpAndSettle();
      expect(done, isTrue);
      expect(find.text('Laporan terkirim'), findsOneWidget);
    });

    testWidgets('springs back when short', (tester) async {
      var done = false;
      await tester.pumpWidget(
        wrap(
          LdsSlideToConfirm(
            label: 'Geser untuk mengirim laporan',
            knobLabel: 'Kirim laporan',
            onConfirmed: () => done = true,
          ),
        ),
      );
      final g = await tester.startGesture(
        tester.getCenter(find.bySemanticsLabel('Kirim laporan')),
      );
      for (var i = 0; i < 8; i++) {
        await g.moveBy(const Offset(10, 0));
        await tester.pump(const Duration(milliseconds: 50));
      }
      await tester.pump(const Duration(milliseconds: 200));
      await g.up();
      await tester.pumpAndSettle();
      expect(done, isFalse);
    });
  });

  group('swipe actions', () {
    Widget row(VoidCallback onDelete) => SizedBox(
      width: 360,
      child: LdsSwipeActions(
        actions: [
          LdsSwipeAction(
            label: 'Arsipkan',
            icon: 'inventory_2',
            onPressed: () {},
          ),
          LdsSwipeAction(
            label: 'Hapus',
            icon: 'delete',
            tone: LdsSwipeActionTone.danger,
            onPressed: onDelete,
          ),
        ],
        child: const SizedBox(
          height: 56,
          child: Text('Laporan lampu jalan mati'),
        ),
      ),
    );

    testWidgets('renders in light and dark', (tester) async {
      await expectBothThemes(tester, row(() {}));
      await tester.drag(
        find.text('Laporan lampu jalan mati'),
        const Offset(-120, 0),
      );
      await tester.pumpAndSettle();
      expect(find.text('Arsipkan'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('a long swipe runs the last action', (tester) async {
      var deleted = false;
      await tester.pumpWidget(wrap(row(() => deleted = true)));
      await tester.drag(
        find.text('Laporan lampu jalan mati'),
        const Offset(-300, 0),
      );
      await tester.pumpAndSettle();
      expect(deleted, isTrue);
    });
  });

  group('pull to refresh', () {
    Widget list(Future<void> Function() onRefresh) => SizedBox(
      height: 400,
      child: LdsPullToRefresh(
        onRefresh: onRefresh,
        child: ListView(
          children: [
            for (var i = 0; i < 20; i++)
              SizedBox(height: 48, child: Text('Laporan $i')),
          ],
        ),
      ),
    );

    testWidgets('renders in light and dark', (tester) async {
      await expectBothThemes(tester, list(() async {}));
    });

    testWidgets('a long pull refreshes', (tester) async {
      var refreshed = 0;
      await tester.pumpWidget(wrap(list(() async => refreshed++)));
      final g = await tester.startGesture(
        tester.getCenter(find.text('Laporan 1')),
      );
      for (var i = 0; i < 15; i++) {
        await g.moveBy(const Offset(0, 20));
        await tester.pump(const Duration(milliseconds: 16));
      }
      await g.up();
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 800));
      await tester.pumpAndSettle();
      expect(refreshed, 1);
    });
  });

  group('shake', () {
    testWidgets('moves and returns to rest', (tester) async {
      final controller = LdsShakeController();
      addTearDown(controller.dispose);
      await expectBothThemes(
        tester,
        LdsShake(controller: controller, child: const Text('Kode salah')),
      );
      final rest = tester.getTopLeft(find.text('Kode salah'));
      controller.shake();
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 60));
      expect(tester.getTopLeft(find.text('Kode salah')), isNot(rest));
      await tester.pumpAndSettle();
      expect(tester.getTopLeft(find.text('Kode salah')), rest);
    });

    testWidgets('stays still with reduced motion', (tester) async {
      final controller = LdsShakeController();
      addTearDown(controller.dispose);
      await tester.pumpWidget(
        wrap(
          LdsShake(controller: controller, child: const Text('Kode salah')),
          reduceMotion: true,
        ),
      );
      final rest = tester.getTopLeft(find.text('Kode salah'));
      controller.shake();
      await tester.pump(const Duration(milliseconds: 60));
      expect(tester.getTopLeft(find.text('Kode salah')), rest);
    });
  });

  group('selection bar', () {
    Widget bar(int count, VoidCallback onClear) => LdsSelectionBar(
      count: count,
      countLabel: (n) => '$n dipilih',
      clearLabel: 'Batalkan pilihan',
      onClear: onClear,
      actions: [
        LdsSelectionAction(label: 'Setujui', icon: 'check', onPressed: () {}),
        LdsSelectionAction(
          label: 'Hapus',
          icon: 'delete',
          destructive: true,
          onPressed: () {},
        ),
      ],
    );

    testWidgets('renders in light and dark', (tester) async {
      await expectBothThemes(tester, bar(3, () {}));
    });

    testWidgets('appears with a selection and clears', (tester) async {
      var cleared = false;
      await tester.pumpWidget(wrap(bar(0, () {})));
      expect(find.text('0 dipilih'), findsNothing);
      await tester.pumpWidget(wrap(bar(2, () => cleared = true)));
      await tester.pumpAndSettle();
      expect(find.text('2 dipilih'), findsOneWidget);
      await tester.tap(find.bySemanticsLabel('Batalkan pilihan'));
      expect(cleared, isTrue);
      await tester.pumpWidget(wrap(bar(0, () {})));
      await tester.pumpAndSettle();
      expect(find.text('2 dipilih'), findsNothing);
    });
  });

  group('inverse button', () {
    testWidgets('renders in light and dark', (tester) async {
      await expectBothThemes(
        tester,
        Builder(
          builder: (context) => ColoredBox(
            color: context.lds.bgInverse,
            child: LdsInverseButton(label: 'Coba lagi', onPressed: () {}),
          ),
        ),
      );
    });
  });

  group('hold to confirm layout', () {
    testWidgets('centers the label vertically', (tester) async {
      for (final expand in [false, true]) {
        await tester.pumpWidget(
          wrapList([
            LdsHoldToConfirm(
              label: 'Tahan untuk kirim SOS',
              icon: 'emergency',
              expand: expand,
              onConfirmed: () {},
            ),
          ]),
        );
        final button = tester.getRect(find.byType(LdsHoldToConfirm));
        final label = tester.getRect(find.text('Tahan untuk kirim SOS'));
        expect((label.center.dy - button.center.dy).abs(), lessThan(1));
      }
    });
  });
}

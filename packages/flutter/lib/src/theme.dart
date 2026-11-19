import 'package:material_ui/material_ui.dart';

import 'tokens.g.dart';

/// Reads Lampung Design System values from the nearest [Theme].
extension LdsThemeContext on BuildContext {
  /// The color roles of the current appearance.
  ///
  /// Falls back to [LdsColors.light] or [LdsColors.dark] by brightness when
  /// the theme was not built with [LdsTheme].
  LdsColors get lds {
    final theme = Theme.of(this);
    return theme.extension<LdsColors>() ??
        (theme.brightness == Brightness.dark
            ? LdsColors.dark
            : LdsColors.light);
  }

  /// Shadows for layers that float, in the current appearance.
  LdsShadows get ldsShadows => Theme.of(this).brightness == Brightness.dark
      ? LdsShadows.dark
      : LdsShadows.light;
}

/// Builds [ThemeData] from the tokens so plain Material widgets already look
/// like Lampung Design System.
abstract final class LdsTheme {
  /// The light theme (the default appearance).
  static ThemeData light() => build(Brightness.light);

  /// The dark theme.
  static ThemeData dark() => build(Brightness.dark);

  /// The theme for [brightness]. [colors] replaces the token colors, for
  /// example a [LdsColors.copyWith] with a different `accent`.
  static ThemeData build(Brightness brightness, {LdsColors? colors}) {
    final isDark = brightness == Brightness.dark;
    final c = colors ?? (isDark ? LdsColors.dark : LdsColors.light);
    final other = isDark ? LdsColors.light : LdsColors.dark;
    final shadows = isDark ? LdsShadows.dark : LdsShadows.light;
    final textTheme = buildTextTheme(c);

    final scheme = ColorScheme(
      brightness: brightness,
      primary: c.accent,
      onPrimary: c.textOnAccent,
      primaryContainer: c.accentTint,
      onPrimaryContainer: c.accentText,
      secondary: c.gold,
      onSecondary: c.onGold,
      secondaryContainer: c.goldTint,
      onSecondaryContainer: c.goldText,
      tertiary: c.tileBlue,
      onTertiary: c.textOnAccent,
      error: c.danger,
      onError: c.textOnAccent,
      errorContainer: c.dangerTint,
      onErrorContainer: c.dangerText,
      surface: c.bgCanvas,
      onSurface: c.textStrong,
      onSurfaceVariant: c.textSubtle,
      surfaceContainerLowest: c.bgBase,
      surfaceContainerLow: c.bgFill,
      surfaceContainer: c.bgFill,
      surfaceContainerHigh: c.bgElevated,
      surfaceContainerHighest: c.bgRecessed,
      outline: c.lineControl,
      outlineVariant: c.lineStrong,
      shadow: shadows.lg.isEmpty ? Colors.black : shadows.lg.last.color,
      scrim: c.bgScrim,
      inverseSurface: c.bgInverse,
      onInverseSurface: c.textInverse,
      inversePrimary: other.accentText,
      surfaceTint: Colors.transparent,
    );

    const controlShape = RoundedRectangleBorder(
      borderRadius: BorderRadius.all(Radius.circular(LdsRadius.md)),
    );
    const minControl = Size(LdsSize.touchMin, LdsSize.control);
    final labelStyle = textTheme.labelLarge!;

    ButtonStyle buttonStyle({
      required Color background,
      required Color foreground,
      Color? hover,
      Color? pressed,
      BorderSide? side,
    }) {
      return ButtonStyle(
        minimumSize: const WidgetStatePropertyAll(minControl),
        padding: const WidgetStatePropertyAll(
          EdgeInsets.symmetric(horizontal: 18),
        ),
        shape: const WidgetStatePropertyAll(controlShape),
        elevation: const WidgetStatePropertyAll(0),
        textStyle: WidgetStatePropertyAll(labelStyle),
        side: side == null ? null : WidgetStatePropertyAll(side),
        backgroundColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.disabled)) {
            return background == Colors.transparent
                ? background
                : background.withAlpha(97);
          }
          if (states.contains(WidgetState.pressed) && pressed != null) {
            return pressed;
          }
          if (states.contains(WidgetState.hovered) && hover != null) {
            return hover;
          }
          return background;
        }),
        foregroundColor: WidgetStateProperty.resolveWith(
          (states) => states.contains(WidgetState.disabled)
              ? foreground.withAlpha(97)
              : foreground,
        ),
        overlayColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.pressed)) return c.bgTintStrong;
          if (states.contains(WidgetState.hovered)) return c.bgTint;
          if (states.contains(WidgetState.focused)) return c.bgTint;
          return null;
        }),
        splashFactory: NoSplash.splashFactory,
        animationDuration: LdsMotion.fast,
      );
    }

    OutlineInputBorder inputBorder(Color color, [double width = 1]) =>
        OutlineInputBorder(
          borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.md)),
          borderSide: BorderSide(color: color, width: width),
        );

    return ThemeData(
      useMaterial3: true,
      brightness: brightness,
      colorScheme: scheme,
      fontFamily: LdsType.family,
      textTheme: textTheme,
      primaryTextTheme: textTheme,
      scaffoldBackgroundColor: c.bgCanvas,
      canvasColor: c.bgCanvas,
      cardColor: c.bgFill,
      dividerColor: c.hairline,
      disabledColor: c.textFaint,
      hintColor: c.textMuted,
      focusColor: c.accentRing,
      hoverColor: c.bgTint,
      highlightColor: c.bgTintStrong,
      splashColor: Colors.transparent,
      splashFactory: NoSplash.splashFactory,
      materialTapTargetSize: MaterialTapTargetSize.padded,
      visualDensity: VisualDensity.standard,
      extensions: <ThemeExtension<dynamic>>[c],
      iconTheme: IconThemeData(color: c.textStrong, size: 22),
      appBarTheme: AppBarTheme(
        backgroundColor: c.bgCanvas,
        foregroundColor: c.textStrong,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
        scrolledUnderElevation: 0,
        centerTitle: false,
        titleTextStyle: LdsType.headline.copyWith(color: c.textStrong),
        iconTheme: IconThemeData(color: c.textStrong),
      ),
      filledButtonTheme: FilledButtonThemeData(
        style: buttonStyle(
          background: c.accent,
          foreground: c.textOnAccent,
          hover: c.accentHover,
          pressed: c.accentPressed,
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: buttonStyle(
          background: c.accentTint,
          foreground: c.accentText,
          hover: c.accentTintStrong,
          pressed: c.accentTintStrong,
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: buttonStyle(
          background: c.bgBase,
          foreground: c.textStrong,
          hover: c.bgFill,
          side: BorderSide(color: c.lineStrong),
        ),
      ),
      textButtonTheme: TextButtonThemeData(
        style:
            buttonStyle(
              background: Colors.transparent,
              foreground: c.accentText,
            ).copyWith(
              padding: const WidgetStatePropertyAll(
                EdgeInsets.symmetric(horizontal: 10),
              ),
            ),
      ),
      iconButtonTheme: IconButtonThemeData(
        style: ButtonStyle(
          minimumSize: const WidgetStatePropertyAll(
            Size.square(LdsSize.touchMin),
          ),
          foregroundColor: WidgetStatePropertyAll(c.textStrong),
          overlayColor: WidgetStatePropertyAll(c.bgTintStrong),
          splashFactory: NoSplash.splashFactory,
        ),
      ),
      floatingActionButtonTheme: FloatingActionButtonThemeData(
        backgroundColor: c.accent,
        foregroundColor: c.textOnAccent,
        elevation: 4,
        shape: const CircleBorder(),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: c.bgBase,
        isDense: false,
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 14,
          vertical: 12,
        ),
        labelStyle: LdsType.subhead.copyWith(color: c.textSubtle),
        floatingLabelStyle: LdsType.caption.copyWith(color: c.accentText),
        hintStyle: LdsType.body.copyWith(color: c.textMuted),
        helperStyle: LdsType.footnote.copyWith(color: c.textSubtle),
        errorStyle: LdsType.footnote.copyWith(color: c.dangerText),
        prefixIconColor: c.textMuted,
        suffixIconColor: c.textMuted,
        border: inputBorder(c.lineControl),
        enabledBorder: inputBorder(c.lineControl),
        focusedBorder: inputBorder(c.accent, 1.5),
        errorBorder: inputBorder(c.danger, 1.5),
        focusedErrorBorder: inputBorder(c.danger, 1.5),
        disabledBorder: inputBorder(c.line),
      ),
      textSelectionTheme: TextSelectionThemeData(
        cursorColor: c.accent,
        selectionColor: c.accentTintStrong,
        selectionHandleColor: c.accent,
      ),
      cardTheme: CardThemeData(
        color: c.bgFill,
        surfaceTintColor: Colors.transparent,
        shadowColor: Colors.transparent,
        elevation: 0,
        margin: EdgeInsets.zero,
        clipBehavior: Clip.antiAlias,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.all(Radius.circular(LdsRadius.lg)),
        ),
      ),
      chipTheme: ChipThemeData(
        backgroundColor: c.bgBase,
        selectedColor: c.accentTint,
        disabledColor: c.bgFill,
        checkmarkColor: c.accentText,
        labelStyle: LdsType.subhead.copyWith(
          color: c.textStrong,
          fontWeight: FontWeight.w500,
        ),
        secondaryLabelStyle: LdsType.subhead.copyWith(
          color: c.accentText,
          fontWeight: FontWeight.w500,
        ),
        side: BorderSide(color: c.lineStrong),
        shape: const StadiumBorder(),
        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 6),
        elevation: 0,
        pressElevation: 0,
        showCheckmark: true,
      ),
      switchTheme: SwitchThemeData(
        thumbColor: const WidgetStatePropertyAll(Colors.white),
        trackColor: WidgetStateProperty.resolveWith((states) {
          final on = states.contains(WidgetState.selected);
          final color = on ? c.accent : c.bgSwitchOff;
          return states.contains(WidgetState.disabled)
              ? color.withAlpha(97)
              : color;
        }),
        trackOutlineColor: const WidgetStatePropertyAll(Colors.transparent),
        thumbIcon: const WidgetStatePropertyAll(null),
        overlayColor: WidgetStatePropertyAll(c.accentRing),
        materialTapTargetSize: MaterialTapTargetSize.padded,
      ),
      checkboxTheme: CheckboxThemeData(
        fillColor: WidgetStateProperty.resolveWith(
          (states) =>
              states.contains(WidgetState.selected) ? c.accent : c.bgBase,
        ),
        checkColor: WidgetStatePropertyAll(c.textOnAccent),
        side: BorderSide(color: c.lineControl, width: 1.5),
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.all(Radius.circular(LdsRadius.xs)),
        ),
      ),
      radioTheme: RadioThemeData(
        fillColor: WidgetStateProperty.resolveWith(
          (states) =>
              states.contains(WidgetState.selected) ? c.accent : c.lineControl,
        ),
      ),
      progressIndicatorTheme: ProgressIndicatorThemeData(
        color: c.accent,
        linearTrackColor: c.bgTrack,
        circularTrackColor: Colors.transparent,
      ),
      sliderTheme: SliderThemeData(
        activeTrackColor: c.accent,
        inactiveTrackColor: c.bgTrack,
        thumbColor: Colors.white,
        overlayColor: c.accentRing,
      ),
      segmentedButtonTheme: SegmentedButtonThemeData(
        style: ButtonStyle(
          minimumSize: const WidgetStatePropertyAll(minControl),
          textStyle: WidgetStatePropertyAll(
            LdsType.subhead.copyWith(fontWeight: FontWeight.w500),
          ),
          backgroundColor: WidgetStateProperty.resolveWith(
            (states) => states.contains(WidgetState.selected)
                ? c.bgSegmentedThumb
                : c.bgSegmented,
          ),
          foregroundColor: WidgetStatePropertyAll(c.textStrong),
          side: WidgetStatePropertyAll(BorderSide(color: c.bgSegmented)),
          splashFactory: NoSplash.splashFactory,
        ),
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: c.bgMaterialSolid,
        surfaceTintColor: Colors.transparent,
        shadowColor: Colors.transparent,
        elevation: 0,
        height: 64,
        indicatorColor: c.accentTint,
        indicatorShape: const StadiumBorder(),
        labelBehavior: NavigationDestinationLabelBehavior.alwaysShow,
        labelTextStyle: WidgetStateProperty.resolveWith((states) {
          final selected = states.contains(WidgetState.selected);
          return LdsType.caption.copyWith(
            fontSize: 12,
            color: selected ? c.accentText : c.textSubtle,
            fontWeight: selected ? FontWeight.w600 : FontWeight.w500,
          );
        }),
        iconTheme: WidgetStateProperty.resolveWith(
          (states) => IconThemeData(
            size: 24,
            color: states.contains(WidgetState.selected)
                ? c.accentText
                : c.textSubtle,
          ),
        ),
      ),
      navigationRailTheme: NavigationRailThemeData(
        backgroundColor: c.bgFill,
        indicatorColor: c.accentTint,
        selectedIconTheme: IconThemeData(color: c.accentText),
        unselectedIconTheme: IconThemeData(color: c.textSubtle),
        selectedLabelTextStyle: LdsType.caption.copyWith(color: c.accentText),
        unselectedLabelTextStyle: LdsType.caption.copyWith(color: c.textSubtle),
      ),
      tabBarTheme: TabBarThemeData(
        labelColor: c.textStrong,
        unselectedLabelColor: c.textSubtle,
        indicatorColor: c.accent,
        dividerColor: c.hairline,
        labelStyle: LdsType.subhead.copyWith(fontWeight: FontWeight.w600),
        unselectedLabelStyle: LdsType.subhead.copyWith(
          fontWeight: FontWeight.w500,
        ),
        overlayColor: WidgetStatePropertyAll(c.bgTint),
        splashFactory: NoSplash.splashFactory,
      ),
      dialogTheme: DialogThemeData(
        backgroundColor: c.bgElevated,
        surfaceTintColor: Colors.transparent,
        elevation: 12,
        shadowColor: scheme.shadow,
        barrierColor: c.bgScrim,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.all(Radius.circular(LdsRadius.xl)),
        ),
        titleTextStyle: LdsType.title3.copyWith(color: c.textStrong),
        contentTextStyle: LdsType.body.copyWith(color: c.textDefault),
        actionsPadding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
      ),
      bottomSheetTheme: BottomSheetThemeData(
        backgroundColor: c.bgElevated,
        modalBackgroundColor: c.bgElevated,
        surfaceTintColor: Colors.transparent,
        elevation: 12,
        modalElevation: 12,
        shadowColor: scheme.shadow,
        modalBarrierColor: c.bgScrim,
        showDragHandle: true,
        dragHandleColor: c.textFaint,
        dragHandleSize: const Size(36, 5),
        clipBehavior: Clip.antiAlias,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(
            top: Radius.circular(LdsRadius.xl),
          ),
        ),
      ),
      snackBarTheme: SnackBarThemeData(
        backgroundColor: c.bgInverse,
        contentTextStyle: LdsType.subhead.copyWith(color: c.textInverse),
        actionTextColor: other.accentText,
        closeIconColor: c.textInverse,
        behavior: SnackBarBehavior.floating,
        elevation: 8,
        insetPadding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.all(Radius.circular(LdsRadius.md)),
        ),
      ),
      tooltipTheme: TooltipThemeData(
        decoration: BoxDecoration(
          color: c.bgInverse,
          borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.sm)),
        ),
        textStyle: LdsType.footnote.copyWith(color: c.textInverse),
        waitDuration: const Duration(milliseconds: 500),
      ),
      popupMenuTheme: PopupMenuThemeData(
        color: c.bgElevated,
        surfaceTintColor: Colors.transparent,
        elevation: 8,
        shadowColor: scheme.shadow,
        textStyle: LdsType.body.copyWith(color: c.textStrong),
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.all(Radius.circular(LdsRadius.md)),
        ),
      ),
      dividerTheme: DividerThemeData(color: c.hairline, thickness: 0.5),
      listTileTheme: ListTileThemeData(
        iconColor: c.textSubtle,
        textColor: c.textStrong,
        titleTextStyle: LdsType.body.copyWith(color: c.textStrong),
        subtitleTextStyle: LdsType.footnote.copyWith(color: c.textSubtle),
        minVerticalPadding: 8,
        minTileHeight: 48,
        selectedColor: c.accentText,
        selectedTileColor: c.accentTint,
      ),
      badgeTheme: BadgeThemeData(
        backgroundColor: c.danger,
        textColor: c.textOnAccent,
      ),
    );
  }

  /// The Material text theme mapped onto the LDS type scale.
  static TextTheme buildTextTheme(LdsColors c) {
    final strong = c.textStrong;
    final body = c.textDefault;
    return TextTheme(
      displayLarge: LdsType.display.copyWith(color: strong),
      displayMedium: LdsType.largeTitle.copyWith(color: strong),
      displaySmall: LdsType.title1.copyWith(color: strong),
      headlineLarge: LdsType.title1.copyWith(color: strong),
      headlineMedium: LdsType.title2.copyWith(color: strong),
      headlineSmall: LdsType.title3.copyWith(color: strong),
      titleLarge: LdsType.title3.copyWith(color: strong),
      titleMedium: LdsType.headline.copyWith(color: strong),
      titleSmall: LdsType.bodyStrong.copyWith(color: strong),
      bodyLarge: LdsType.body.copyWith(color: body),
      bodyMedium: LdsType.body.copyWith(color: body),
      bodySmall: LdsType.footnote.copyWith(color: c.textSubtle),
      labelLarge: LdsType.bodyStrong.copyWith(
        color: strong,
        fontWeight: FontWeight.w600,
        letterSpacing: -0.15,
      ),
      labelMedium: LdsType.caption.copyWith(color: c.textSubtle),
      labelSmall: LdsType.caption.copyWith(fontSize: 12, color: c.textSubtle),
    );
  }
}

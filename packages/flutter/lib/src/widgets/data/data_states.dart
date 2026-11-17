import 'dart:async';

import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../tokens.g.dart';
import '../alert.dart';
import '../button.dart';
import '../empty_state.dart';
import '../skeleton.dart';

/// Which of the four states a region of data is in.
enum LdsDataState {
  /// Waiting for data: a skeleton that mirrors the loaded layout.
  loading,

  /// Loaded and nothing in it.
  empty,

  /// Failed to load.
  error,

  /// The real content.
  loaded,
}

/// One region of data that switches between loading, empty, error and
/// loaded, the same way everywhere.
///
/// Loading shows [skeleton] only after [loadingDelay], so fast responses go
/// straight to loaded, and marks the region busy. Loaded content fades in
/// over 240 ms; empty and error appear without motion.
class LdsDataStates extends StatefulWidget {
  /// Creates a data region.
  const LdsDataStates({
    super.key,
    required this.state,
    required this.child,
    this.skeleton,
    this.loadingLabel = 'Memuat',
    this.loadingDelay = const Duration(milliseconds: 300),
    this.emptyTitle = 'Belum ada data',
    this.emptyBody,
    this.emptyIcon = 'inbox',
    this.emptyAction,
    this.errorTitle = 'Data tidak dapat dimuat',
    this.errorBody =
        'Tidak ada data yang hilang. Periksa koneksi, lalu coba lagi.',
    this.onRetry,
    this.retryLabel = 'Coba lagi',
  });

  /// The current state.
  final LdsDataState state;

  /// The loaded content.
  final Widget child;

  /// Placeholder shaped like [child]. Defaults to three text rows.
  final Widget? skeleton;

  /// Announced while loading.
  final String loadingLabel;

  /// Wait before the skeleton shows.
  final Duration loadingDelay;

  /// What is empty, in plain words.
  final String emptyTitle;

  /// Why, and what fills it.
  final String? emptyBody;

  /// Empty state glyph.
  final String emptyIcon;

  /// The one action that fills the region or clears the filter.
  final Widget? emptyAction;

  /// What failed.
  final String errorTitle;

  /// That nothing was lost, and what to do.
  final String errorBody;

  /// Retries the load; null leaves out the button.
  final VoidCallback? onRetry;

  /// Retry button label.
  final String retryLabel;

  @override
  State<LdsDataStates> createState() => _LdsDataStatesState();
}

class _LdsDataStatesState extends State<LdsDataStates> {
  Timer? _delay;
  bool _showSkeleton = false;

  @override
  void initState() {
    super.initState();
    _sync();
  }

  @override
  void didUpdateWidget(LdsDataStates oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.state != widget.state) _sync();
  }

  void _sync() {
    _delay?.cancel();
    if (widget.state != LdsDataState.loading) return;
    _showSkeleton = widget.loadingDelay == Duration.zero;
    if (!_showSkeleton) {
      _delay = Timer(widget.loadingDelay, () {
        if (mounted) setState(() => _showSkeleton = true);
      });
    }
  }

  @override
  void dispose() {
    _delay?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    switch (widget.state) {
      case LdsDataState.loading:
        return Semantics(
          label: widget.loadingLabel,
          liveRegion: true,
          container: true,
          child: ExcludeSemantics(
            child: _showSkeleton
                ? widget.skeleton ?? const _DefaultSkeleton()
                : const SizedBox(height: 1),
          ),
        );
      case LdsDataState.empty:
        return LdsEmptyState(
          title: widget.emptyTitle,
          body: widget.emptyBody,
          icon: widget.emptyIcon,
          action: widget.emptyAction,
        );
      case LdsDataState.error:
        return Semantics(
          liveRegion: true,
          child: LdsAlert(
            title: widget.errorTitle,
            body: widget.errorBody,
            tone: LdsAlertTone.danger,
            actions: [
              if (widget.onRetry != null)
                LdsButton(
                  label: widget.retryLabel,
                  variant: LdsButtonVariant.secondary,
                  size: LdsButtonSize.sm,
                  onPressed: widget.onRetry,
                ),
            ],
          ),
        );
      case LdsDataState.loaded:
        return TweenAnimationBuilder<double>(
          tween: Tween(begin: 0, end: 1),
          duration: context.ldsDuration(LdsMotion.standard),
          curve: LdsMotion.enterCurve,
          builder: (context, t, child) => Opacity(opacity: t, child: child),
          child: widget.child,
        );
    }
  }
}

class _DefaultSkeleton extends StatelessWidget {
  const _DefaultSkeleton();

  @override
  Widget build(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        LdsSkeleton(width: 180, height: 18),
        SizedBox(height: 12),
        LdsSkeleton(),
        SizedBox(height: 8),
        LdsSkeleton(width: 240),
      ],
    );
  }
}

import 'package:flutter/material.dart';

class CustomCursor extends StatefulWidget {
  final Widget child;
  const CustomCursor({super.key, required this.child});

  @override
  State<CustomCursor> createState() => _CustomCursorState();
}

class _CustomCursorState extends State<CustomCursor> {
  Offset pointerPos = Offset.zero;
  List<Offset> trail = [];
  final int maxTrailLength = 10;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      cursor: SystemMouseCursors.none, // Hide the default system cursor
      onHover: (event) {
        setState(() {
          pointerPos = event.localPosition;
          // Add new position to trail
          trail.add(pointerPos);
          if (trail.length > maxTrailLength) {
            trail.removeAt(0);
          }
        });
      },
      child: Stack(
        children: [
          widget.child,
          // 1. Mouse Trail Particles
          ...trail.asMap().entries.map((entry) {
            int idx = entry.key;
            Offset position = entry.value;
            double opacity = idx / maxTrailLength;
            double size = idx * 1.5;

            return Positioned(
              left: position.dx - (size / 2),
              top: position.dy - (size / 2),
              child: IgnorePointer(
                child: Opacity(
                  opacity: opacity * 0.5,
                  child: Container(
                    width: size,
                    height: size,
                    decoration: BoxDecoration(
                      color: const Color(0xFFEC5334).withOpacity(0.3),
                      shape: BoxShape.circle,
                    ),
                  ),
                ),
              ),
            );
          }).toList(),

          // 2. The Main Cursor
          Positioned(
            left: pointerPos.dx - 10,
            top: pointerPos.dy - 10,
            child: IgnorePointer(
              child: Container(
                width: 20,
                height: 20,
                decoration: BoxDecoration(
                  border: Border.all(color: const Color(0xFFEC5334), width: 2),
                  shape: BoxShape.circle,
                ),
                child: Center(
                  child: Container(
                    width: 4,
                    height: 4,
                    decoration: const BoxDecoration(
                      color: Color(0xFFEC5334),
                      shape: BoxShape.circle,
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
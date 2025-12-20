import 'dart:math';
import 'package:flutter/material.dart';

class StarField extends StatefulWidget {
  const StarField({super.key});

  @override
  State<StarField> createState() => _StarFieldState();
}

class _StarFieldState extends State<StarField> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  // Increase star count for a richer night sky
  final List<Offset> _stars = List.generate(150, (i) => Offset(Random().nextDouble(), Random().nextDouble()));

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(seconds: 30))..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Container(
          // Night Sky Gradient
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [Color(0xFF020B1A), Color(0xFF0A1828)],
            ),
          ),
          child: CustomPaint(
            size: Size.infinite,
            painter: StarPainter(_stars, _controller.value),
          ),
        );
      },
    );
  }
}

class StarPainter extends CustomPainter {
  final List<Offset> stars;
  final double progress;
  StarPainter(this.stars, this.progress);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..color = Colors.white;
    
    for (int i = 0; i < stars.length; i++) {
      double dx = stars[i].dx * size.width;
      double dy = (stars[i].dy * size.height + (progress * size.height)) % size.height;
      
      // Adding a "twinkle" effect using sine waves
      double opacity = 0.3 + (0.7 * sin(progress * 2 * pi + i));
      paint.color = Colors.white.withOpacity(opacity.clamp(0.1, 1.0));
      
      canvas.drawCircle(Offset(dx, dy), i % 3 == 0 ? 1.5 : 0.8, paint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
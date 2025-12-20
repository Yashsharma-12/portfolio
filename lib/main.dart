import 'package:flutter/material.dart';
import 'screens/home_screen.dart'; // Import your new file

void main() => runApp(const PortfolioApp());

class PortfolioApp extends StatelessWidget {
  const PortfolioApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Yash | Portfolio',
      theme: ThemeData(
        scaffoldBackgroundColor: const Color(0xFFF4EDE3), // Your cream background
        useMaterial3: true,
      ),
      home: const HomeScreen(), // Calling the separate page
    );
  }
}
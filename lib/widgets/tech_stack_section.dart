import 'package:flutter/material.dart';
import 'tech_card.dart';
import '../data/tech_data.dart';

class TechStackSection extends StatelessWidget {
  final double scrollOffset;

  const TechStackSection({super.key, required this.scrollOffset});

  @override
  Widget build(BuildContext context) {
    final double screenWidth = MediaQuery.of(context).size.width;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 50, vertical: 80),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "Core Tech Stack",
            style: TextStyle(
              color: Colors.white, 
              fontSize: 32, 
              fontWeight: FontWeight.bold, 
              letterSpacing: 1.5
            ),
          ),
          const SizedBox(height: 40),
          _buildGrid(context, techStack, screenWidth, baseTrigger: 400),

          const SizedBox(height: 120),

          const Text(
            "Professional Tools",
            style: TextStyle(
              color: Colors.white, 
              fontSize: 32, 
              fontWeight: FontWeight.bold, 
              letterSpacing: 1.5
            ),
          ),
          const SizedBox(height: 40),
          _buildGrid(context, toolStack, screenWidth, baseTrigger: 900),
        ],
      ),
    );
  }

  Widget _buildGrid(BuildContext context, List<TechModel> list, double screenWidth, {required double baseTrigger}) {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: list.length,
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: screenWidth > 1200 ? 4 : (screenWidth > 800 ? 3 : 2),
        crossAxisSpacing: 30,
        mainAxisSpacing: 30,
        childAspectRatio: 3.0, 
      ),
      itemBuilder: (context, index) => TechCard(
        name: list[index].name,
        logoUrl: list[index].logo,
        index: index,
        scrollOffset: scrollOffset,
        baseTrigger: baseTrigger, 
      ),
    );
  }
}
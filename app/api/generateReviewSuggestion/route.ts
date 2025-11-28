import { NextRequest, NextResponse } from 'next/server';

const autoGarageSuggestions = [
  "Professional service and genuine care for my vehicle. The team took time to explain every repair and was transparent about costs. Very satisfied with the work!",
  "Excellent work on my car maintenance. They fixed the issue properly and the pricing was fair. Would definitely recommend to anyone looking for reliable auto service.",
  "Great experience! The mechanics were knowledgeable and friendly. They completed the repair on time and did a thorough job. Will be coming back for future maintenance.",
  "Outstanding service! They diagnosed the problem quickly and fixed it right. The staff was helpful and made the whole process smooth. Highly recommend this garage!",
  "Very impressed with their technical expertise and professionalism. They answered all my questions and took great care of my vehicle. Best auto garage in town!",
  "Reliable and trustworthy service. The team is honest about what needs to be done and doesn't push unnecessary repairs. Great quality work at reasonable prices.",
  "Exceptional service quality. They went above and beyond to ensure my car was fixed properly. Friendly staff and clean facilities. 5 stars!",
  "Quick turnaround time and excellent customer service. The staff explained the repairs clearly and the final result exceeded my expectations!",
  "Been bringing my car here for years. Consistent quality, fair pricing, and always treat me like family. This is where you want to service your vehicle!",
  "Impressive technical knowledge. They fixed a problem that other shops couldn't diagnose. Won't go anywhere else for my car maintenance."
];

export async function POST(request: NextRequest) {
  try {
    const { businessName, category, campaignId } = await request.json();

    // Return predefined suggestions with randomization
    const shuffled = [...autoGarageSuggestions].sort(() => Math.random() - 0.5);
    const suggestions = shuffled.slice(0, 3);

    return NextResponse.json({
      suggestions,
      category,
      businessName,
      source: 'predefined',
    });
  } catch (error) {
    console.error('Error generating suggestions:', error);

    // Always provide fallback suggestions even on error
    const fallbackSuggestions = [...autoGarageSuggestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    return NextResponse.json({
      suggestions: fallbackSuggestions,
      category: 'Auto Garage',
      businessName: 'Business',
      source: 'fallback-error',
    });
  }
}

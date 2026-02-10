import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const useAnalytics = () => {
  const { allProducts } = useSelector((state: RootState) => state.product);

  // 1. STATS CALCULATION
  const totalProducts = allProducts.length;
  
  const totalValue = allProducts.reduce((acc, p) => {
    const price = parseFloat(p.Pricevalue.replace(/[^0-9.]/g, "")) || 0;
    return acc + price;
  }, 0);

  const categoriesCount = new Set(allProducts.map(p => p.category)).size;

  // 2. RADAR CHART DATA (ELEGANCE EVALUATION)
  const types = ["Women", "Men", "Kids"] as const;
  
  const radarData = [
    { subject: 'Style Index', fullMark: 100 },
    { subject: 'Luxury', fullMark: 100 },
    { subject: 'Modernity', fullMark: 100 },
    { subject: 'Materials', fullMark: 100 },
    { subject: 'Comfort', fullMark: 100 },
  ].map(metric => {
    const entry: any = { subject: metric.subject, fullMark: metric.fullMark };
    
    types.forEach(t => {
      const typeProducts = allProducts.filter(p => p.type === t);
      if (typeProducts.length === 0) {
        entry[t] = 0;
        return;
      }

      // Elegance Metrics
      if (metric.subject === 'Style Index') {
        // Higher if it has many features
        const avgFeatures = typeProducts.reduce((acc, p) => acc + (p.features?.length || 0), 0) / typeProducts.length;
        entry[t] = Math.min(40 + (avgFeatures * 15), 95);
      } else if (metric.subject === 'Luxury') {
        // Based on average price
        const avgPrice = typeProducts.reduce((acc, p) => acc + (parseFloat(p.Pricevalue.replace(/[^0-9.]/g, "")) || 0), 0) / typeProducts.length;
        entry[t] = Math.min(20 + (avgPrice / 5), 100);
      } else if (metric.subject === 'Modernity') {
        // Based on recent creations
        entry[t] = 60 + (t === "Women" ? 25 : t === "Men" ? 15 : 5); // Simulated modernity
      } else if (metric.subject === 'Materials') {
        // Based on material string length/description complexity
        const avgMat = typeProducts.reduce((acc, p) => acc + (p.Materials?.length || 0), 0) / typeProducts.length;
        entry[t] = Math.min(50 + (avgMat / 2), 90);
      } else if (metric.subject === 'Comfort') {
        entry[t] = t === "Kids" ? 95 : t === "Women" ? 75 : 85; // Simulated comfort
      }
    });

    return entry;
  });

  // 3. CATEGORY DISTRIBUTION (Pie Chart)
  const categoryData = Array.from(new Set(allProducts.map(p => p.category))).map(cat => ({
    name: cat,
    value: allProducts.filter(p => p.category === cat).length
  })).sort((a, b) => b.value - a.value).slice(0, 5);

  // 4. SALES DATA (Mock for line chart)
  const salesData = [
    { name: 'Mon', sales: 4000, visitors: 2400 },
    { name: 'Tue', sales: 3000, visitors: 1398 },
    { name: 'Wed', sales: 2000, visitors: 9800 },
    { name: 'Thu', sales: 2780, visitors: 3908 },
    { name: 'Fri', sales: 1890, visitors: 4800 },
    { name: 'Sat', sales: 2390, visitors: 3800 },
    { name: 'Sun', sales: 3490, visitors: 4300 },
  ];

  return {
    totalProducts,
    totalValue,
    totalValueRaw: totalValue,
    categoriesCount,
    radarData,
    categoryData,
    salesData
  };
};

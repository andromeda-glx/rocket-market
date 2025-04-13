export function formatPrice(price){
    const formattedPrice = Intl.NumberFormat("en-US", {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(price);
    
    return formattedPrice;
}
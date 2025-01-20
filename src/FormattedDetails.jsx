const FormattedLandPrice = ({ land }) => {
  const landSizeInAcres = land.land_size?.total_land_size_in_acres?.acres;
  const landSizeInCents = land.land_size?.total_land_size_in_acres?.cents;
  const landSizeInGuntas = land.land_size?.total_land_size_in_acres?.guntas;

  const formatPrice = (price) => {
    if (price >= 100) {
      let priceInCr = (price / 100).toFixed(2);
      priceInCr = parseFloat(priceInCr).toString();
      return `₹ ${priceInCr} cr`;
    } else {
      return `₹ ${price} lakhs`;
    }
  };

  const totalLandSizeInAcres = () => {
    if (landSizeInAcres && landSizeInCents && landSizeInGuntas) {
      return `${landSizeInAcres} Acres ${landSizeInCents} Cents ${landSizeInGuntas} Guntas`;
    } else if (landSizeInAcres && landSizeInCents && !landSizeInGuntas) {
      return `${landSizeInAcres} Acres ${landSizeInCents} Cents`;
    } else if (landSizeInAcres && landSizeInGuntas) {
      return `${landSizeInAcres} Acres ${landSizeInGuntas} Guntas`;
    } else if (!landSizeInAcres && landSizeInCents && landSizeInGuntas) {
      return `${landSizeInGuntas} Guntas ${landSizeInCents} Cents`;
    } else {
      return `${landSizeInAcres} Acres`;
    }
  };

  if (!landSizeInAcres && !landSizeInCents && landSizeInGuntas) {
    return `${formatPrice(land?.total_price)} for full property • ${landSizeInGuntas} Guntas`;
  }
  return `${formatPrice(land?.price_per_acre)} /acre • ${totalLandSizeInAcres()}`;
};

export default FormattedLandPrice;

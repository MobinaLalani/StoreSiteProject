export interface SiteSettings {
  store: { name: string; shortDescription: string; address: string; landline: string; mobile: string; whatsapp: string; email: string; workingHours: string; logo: string; favicon: string };
  inquiry: { phoneEnabled: boolean; whatsappEnabled: boolean; buttonText: string; whatsappMessage: string; afterHoursMessage: string };
  social: { instagram: string; telegram: string; linkedin: string; aparat: string };
  appearance: {
    primaryColor: string;
    heroEyebrow: string;
    heroTitle: string;
    heroDescription: string;
    heroImage: string;
    heroPrimaryButtonText: string;
    heroPrimaryButtonLink: string;
    heroPrimaryButtonEnabled: boolean;
    heroSecondaryButtonText: string;
    heroSecondaryButtonLink: string;
    heroSecondaryButtonEnabled: boolean;
    heroProductLabel: string;
    heroFeaturedBadgeText: string;
    heroStatsEnabled: boolean;
    heroProductStatLabel: string;
    heroCategoryStatLabel: string;
    heroTrustStatLabel: string;
    showCategories: boolean;
    showFeaturedProducts: boolean;
  };
  seo: { title: string; description: string; keywords: string; shareImage: string; siteUrl: string; googleSiteVerification: string; allowIndexing: boolean };
}

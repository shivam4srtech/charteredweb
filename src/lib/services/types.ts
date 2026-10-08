/** Shape of the services feed (/api/app-services), generated from the Services Template (Excel). */

export type BadgeKey = "popular" | "quick" | "recommended" | "new";

export type ServiceDocument = {
  name: string;
  mandatory: boolean;
  note: string;
};

export type ServiceStep = {
  step_no: number;
  name: string;
  description: string;
  /** "Client" | "Service Provider" | "CharteredONE" | "Government Authority" | "" */
  responsible: string;
  status_label: string;
  expected_days: number;
};

export type StateOverride = {
  price_from?: number;
  tat_min?: number;
  tat_max?: number;
  available?: boolean;
  note?: string;
};

export type Service = {
  id: string;
  name: string;
  category: string;
  country?: string;
  card_description: string;
  intro: string;
  overview: string;
  price_from: number;
  price_note: string;
  tat_min: number;
  tat_max: number;
  badges: BadgeKey[];
  icon: string;
  icon_text: string;
  icon_color: string;
  available_states: "ALL" | string[];
  display_rank: number;
  active: boolean;
  documents: ServiceDocument[];
  deliverables: string[];
  steps: ServiceStep[];
  state_overrides: Record<string, StateOverride>;
};

export type Country = {
  code: string;
  name?: string;
  currency?: string;
  active?: boolean;
  region_label?: string;
  region_label_plural?: string;
  regions?: string[] | null;
  flag?: string;
};

export type ServicesFeed = {
  version?: number;
  generated_at?: string;
  categories: string[];
  states: string[];
  countries?: Country[];
  services: Service[];
};

/** Feed after clean-up, plus old-ID → new-ID aliases for deep links and saved hearts. */
export type CleanServices = ServicesFeed & {
  aliases: Record<string, string>;
};

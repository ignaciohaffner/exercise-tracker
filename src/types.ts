export interface Exercise {
  number: number;
  state: "sin resolver" | "resuelto" | "no me salió" | "duda";
}

export interface Section {
  name: string;
  exercises: Exercise[];
}

export interface Topic {
  name: string;
  sections: Section[];
}

export interface Notes {
    noteId?: number;
    description: string;
    tagName: string;
    tagColor: string;
    date: string;
    favorite: boolean;
}

export interface UserNotes {
    id?: string;
    notes: Notes[];
}

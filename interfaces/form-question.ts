import type { UpdatedMetaData, BaseModel, DeletionMetaData } from ".";

enum QuestionType {
    BOOLEAN = "boolean",
    STRING = "string",
    MULTI_CHOICE = "multi_choice",
    SINGLE_CHOICE = "single_choice",
    NUMBER = "number",
}

interface IOptions {
    label: string;
    value: string;
}

interface IFormQuestion extends UpdatedMetaData, BaseModel, DeletionMetaData {
    question: string;
    type: QuestionType;
    required: boolean;
    options?: IOptions[];
}

export {
    IFormQuestion,
    QuestionType,
    IOptions
};

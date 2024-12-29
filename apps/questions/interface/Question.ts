import { BaseMeta } from "apps/common/models/Base";


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

interface IQuestion extends BaseMeta {
    question: string;
    type: QuestionType;
    required: boolean;
    options?: IOptions[];
}

type TQuestionList = {
    total: number,
    data: IQuestion[]
}

type TPayloadQuestion = {
    question: string;
    type: QuestionType;
    required: boolean;
    options?: IOptions[];
    createdBy: number;
}

export {
    IQuestion,
    QuestionType,
    IOptions,
    TQuestionList,
    TPayloadQuestion
};

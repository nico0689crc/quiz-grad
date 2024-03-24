import { Quiz } from "@/types";
import { Box } from "@mui/material";
import ItemQuiz from "./item-quiz";

type ListQuizesProps = {
  quizes: Quiz[];
};

export default function ListQuizes({ quizes }: ListQuizesProps) {
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
      }}
    >
      {quizes.map((quiz, index) => (
        <ItemQuiz key={index} quiz={quiz} />
      ))}
    </Box>
  );
}

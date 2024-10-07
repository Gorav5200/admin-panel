import React from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import styled from "styled-components";

const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid var(--med-grey);
  font-family:var(--font-inter);
  background-color: "#f9f9f9";
  text-align: center;
  font-size: "12px";
`;

const RenderTree = ({ data }) => {
  return data.map((node) => (
    <TreeNode
      label={<StyledNode className="tree-node text-sm font-inder ">{node.label}</StyledNode>}
    >
      {node.children && <RenderTree data={node.children} />}
    </TreeNode>
  ));
};

export default function TreeGraph({data}) {
const organizationData = [
  {
    label: "CAT",
    children: [
      {
        label: "Quants",
        children: [
          {
            label: "Algebra",
            children: [
              {
                label: "Logarithm",
              },
              {
                label: "Functions",
              },
              {
                label: "Inequalities & Modulus",
              },
              {
                label: "Functions & Graphs",
              },
              {
                label: "Liner Equation",
              },
              {
                label: "Progression & Series",
              },
              {
                label: "Higher Polynomials",
              },
              {
                label: "Maxima Minima",
              },
              {
                label: "Linear Algebra",
              },
              {
                label: "Higher Polynomials",
              },
              {
                label: "Maxima Minima",
              },
              {
                label: "Integral Solution",
              },
              {
                label: "Quadratic",
              },
              {
                label: "Quadratic Equations",
              },
              {
                label: "Liner Equation",
              },
              {
                label: "Inequalities",
              },
              {
                label: "Graphs",
              },
              {
                label: "Logarithm",
              },
              {
                label: "Linear Equation",
              },
              {
                label: "Liner Equation",
              },
              {
                label: "Inequalities",
              },
              {
                label: "Graphs",
              },
              {
                label: "Linear Algebra",
              },
              {
                label: "Progression & Series",
              },
              {
                label: "Logarithm",
              },
              {
                label: "Integral Solution",
              },
              {
                label: "Quadratic",
              },
              {
                label: "Functions & Graphs",
              },
              {
                label: "Inequalities",
              },
              {
                label: "Graphs",
              },
              {
                label: "Integral Solution",
              },
              {
                label: "Progression & Series",
              },
              {
                label: "Quadratic Equations",
              },
              {
                label: "Higher Polynomials",
              },
              {
                label: "Maxima Minima",
              },
              {
                label: "Functions",
              },
              {
                label: "Linear Algebra",
              },
              {
                label: "Inequalities & Modulus",
              },
              {
                label: "Liner Equation",
              },
              {
                label: "Quadratic Equations",
              },
              {
                label: "Liner Equation",
              },
              {
                label: "Functions",
              },
              {
                label: "Inequalities & Modulus",
              },
              {
                label: "Quadratic",
              },
              {
                label: "Functions & Graphs",
              },
              {
                label: "QA subtopic",
              },
              {
                label: "QA subtopic",
              },
              {
                label: "QA subtopic",
              },
              {
                label: "QA subtopic",
              },
              {
                label: "QA subtopic",
              },
              {
                label: "QA subtopic",
              },
              {
                label: "QA subtopic",
              },
              {
                label: "QA subtopic",
              },
              {
                label: "QA subtopic",
              },
              {
                label: "QA subtopic",
              },
              {
                label: "QA subtopic",
              },
              {
                label: "QA subtopic",
              },
              {
                label: "QA subtopic",
              },
              {
                label: "QA subtopic",
              },
            ],
          },
          {
            label: "Arithmetic",
            children: [
              {
                label: "Mixture & Alligation",
              },
              {
                label: "Basic TSD",
              },
              {
                label: "Time & Work",
              },
              {
                label: "Time & Work",
              },
              {
                label: "Time, Speed & Distance",
              },
              {
                label: "Circular Races",
              },
              {
                label: "Relative Motion",
              },
              {
                label: "Circular Races",
              },
              {
                label: "Trains & Escalators",
              },
              {
                label: "Relative Motion",
              },
              {
                label: "Circular Races",
              },
              {
                label: "Trains & Escalators",
              },
              {
                label: "Relative Motion",
              },
              {
                label: "Time, Speed & Distance",
              },
              {
                label: "Boats and Streams",
              },
              {
                label: "Basic TSD",
              },
              {
                label: "Mixture & Allegation",
              },
              {
                label: "Linear Races",
              },
              {
                label: "Boats and Streams",
              },
              {
                label: "Trains & Escalators",
              },
              {
                label: "Basic TSD",
              },
              {
                label: "Time & Work",
              },
              {
                label: "Linear Races",
              },
              {
                label: "Boats and Streams",
              },
              {
                label: "Mixture & Allegation",
              },
              {
                label: "Time, Speed & Distance",
              },
              {
                label: "Linear Races",
              },
              {
                label: "Percentage",
              },
              {
                label: "SI-CI",
              },
              {
                label: "Ratio & Proportion",
              },
              {
                label: "Pipes and Cistern",
              },
              {
                label: "Averages",
              },
              {
                label: "Partnership",
              },
              {
                label: "Profit & Loss",
              },
            ],
          },
          {
            label: "Number system",
            children: [
              {
                label: "HCF & LCM",
              },
              {
                label: "Trade Awareness",
              },
              {
                label: "HCF & LCM",
              },
              {
                label: "HCF & LCM",
              },
              {
                label: "Factors",
              },
              {
                label: "Miscellaneous Numbers",
              },
              {
                label: "Culture",
              },
              {
                label: "Sports",
              },
              {
                label: "Nation and States",
              },
              {
                label: "Factors",
              },
              {
                label: "Factors",
              },
              {
                label: "Divisibility & Remainders",
              },
              {
                label: "Divisibility & Remainders",
              },
              {
                label: "Sports News",
              },
              {
                label: "Economics",
              },
              {
                label: "Divisibility & Remainders",
              },
              {
                label: "Miscellaneous Numbers",
              },
              {
                label: "Miscellaneous Numbers",
              },
              {
                label: "Factors",
              },
              {
                label: "HCF & LCM",
              },
              {
                label: "Miscellaneous Numbers",
              },
              {
                label: "History",
              },
              {
                label: "Current Affairs of National and International Economy",
              },
              {
                label: "Geography",
              },
              {
                label: "Personalities in News",
              },
              {
                label: "Divisibility & Remainders",
              },
              {
                label: "Probability",
              },
              {
                label: "Numbers",
              },
            ],
          },
          {
            label: "Geometry",
            children: [
              {
                label: "Geometry Basics",
              },
              {
                label: "Mensuration & Coordinate Geometry",
              },
              {
                label: "Trignometry",
              },
              {
                label: "Triangles",
              },
              {
                label: "Triangles",
              },
              {
                label: "Triangles",
              },
              {
                label: "Quadrilateral",
              },
              {
                label: "Trignometry",
              },
              {
                label: "Geometry Basics",
              },
              {
                label: "Trignometry",
              },
              {
                label: "Quadrilateral",
              },
              {
                label: "Higher Polygons",
              },
              {
                label: "Mensuration & Coordinate Geometry",
              },
              {
                label: "Trignometry",
              },
              {
                label: "Quadrilateral",
              },
              {
                label: "Higher Polygons",
              },
              {
                label: "Higher Polygons",
              },
              {
                label: "Geometry Basics",
              },
              {
                label: "Mensuration & Coordinate Geometry",
              },
              {
                label: "Triangles",
              },
              {
                label: "Circles",
              },
              {
                label: "Quadrilateral",
              },
              {
                label: "Circles",
              },
              {
                label: "Mensuration & Coordinate Geometry",
              },
              {
                label: "Geometry Basics",
              },
              {
                label: "Circles",
              },
              {
                label: "Circles",
              },
              {
                label: "Higher Polygons",
              },
            ],
          },
          {
            label: "Modern Maths",
            children: [
              {
                label: "Probability",
              },
              {
                label: "Sequence & Series",
              },
              {
                label: "Venn Diagram",
              },
              {
                label: "Sequence & Series",
              },
              {
                label: "PNC",
              },
              {
                label: "Probability",
              },
              {
                label: "Venn Diagram",
              },
              {
                label: "PNC",
              },
              {
                label: "PNC",
              },
              {
                label: "Probability",
              },
              {
                label: "Sequence & Series",
              },
              {
                label: "Venn Diagram",
              },
            ],
          },
        ],
      },
      {
        label: "VARC",
        children: [
          {
            label: "Reading Comprehension",
            children: [
              {
                label: "History",
              },
              {
                label: "Arts, Culture & Society",
              },
              {
                label: "Title Based",
              },
              {
                label: "Central Theme Based",
              },
              {
                label: "Environment",
              },
              {
                label: "Miscellaneous Genre",
              },
              {
                label: "Arts, Culture & Society",
              },
              {
                label: "Inferential Questions",
              },
              {
                label: "Critical Reasoning Based",
              },
              {
                label: "Title Based",
              },
              {
                label: "Summary Based",
              },
              {
                label: "Bussiness & Economics",
              },
              {
                label: "History",
              },
              {
                label: "Science & Technology",
              },
              {
                label: "Miscellaneous",
              },
              {
                label: "Census",
              },
              {
                label: "Miscellaneous Genre",
              },
              {
                label: "Science & Technology",
              },
              {
                label: "Politics",
              },
              {
                label: "Supporting Sentence Based",
              },
              {
                label: "Supporting Theme Based",
              },
              {
                label: "Science & Technology",
              },
              {
                label: "Philosophy/Psychology",
              },
              {
                label: "Tone Based",
              },
              {
                label: "Fact Based",
              },
              {
                label: "Central Theme Based",
              },
              {
                label: "Inference Based",
              },
              {
                label: "Strengthening Based",
              },
              {
                label: "Sports",
              },
              {
                label: "Social issues",
              },
              {
                label: "Critical Reasoning Based",
              },
              {
                label: "Fact Based",
              },
              {
                label: "Strengthening Based",
              },
              {
                label: "History",
              },
              {
                label: "Politics",
              },
              {
                label: "Main Idea/Central Idea",
              },
              {
                label: "Supporting Idea",
              },
              {
                label: "Supporting Theme Based",
              },
              {
                label: "Polity",
              },
              {
                label: "Awards",
              },
              {
                label: "Programs & Acts",
              },
              {
                label: "Bussiness/Economics",
              },
              {
                label: "Environment",
              },
              {
                label: "Philosophy/Psychology",
              },
              {
                label: "Inferential Questions",
              },
              {
                label: "Tone Based",
              },
              {
                label: "Main Idea/Central Idea",
              },
              {
                label: "Supporting Idea",
              },
              {
                label: "Inference Based",
              },
              {
                label: "Summary Based",
              },
              {
                label: "Bussiness/Economics",
              },
              {
                label: "Supporting Sentence Based",
              },
              {
                label: "Current Affairs",
              },
              {
                label: "Geography",
              },
              {
                label: "Books",
              },
              {
                label: "Current Affairs",
              },
              {
                label: "Programs & Acts",
              },
              {
                label: "Geography",
              },
              {
                label: "Sports",
              },
              {
                label: "Miscellaneous",
              },
              {
                label: "Census",
              },
              {
                label: "Polity",
              },
              {
                label: "Social issues",
              },
              {
                label: "Bussiness & Economics",
              },
              {
                label: "History",
              },
              {
                label: "Science & Technology",
              },
              {
                label: "Awards",
              },
              {
                label: "Books",
              },
            ],
          },
          {
            label: "Verbal Ability",
            children: [
              {
                label: "Sentence Correction",
              },
              {
                label: "Para jumbles",
              },
              {
                label: "Fill in the blanks",
              },
              {
                label: "Critical Reasoning",
              },
              {
                label: "Fill in the blanks",
              },
              {
                label: "Odd One Out",
              },
              {
                label: "Odd One Out",
              },
              {
                label: "Para Completion",
              },
              {
                label: "Para summary",
              },
              {
                label: "Para Completion",
              },
              {
                label: "Critical Reasoning",
              },
              {
                label: "Para jumbles",
              },
              {
                label: "Sentence Correction",
              },
              {
                label: "Para summary",
              },
            ],
          },
          {
            label: "Tech",
            children: [],
          },
        ],
      },
      {
        label: "LRDI",
        children: [
          {
            label: "Logical Reasoning",
            children: [
              {
                label: "Distribution",
              },
              {
                label: "Quant Based Puzzles",
              },
              {
                label: "Cubes",
              },
              {
                label: "Linear Arrangement",
              },
              {
                label: "Quant Based Puzzles",
              },
              {
                label: "Games & Tournaments",
              },
              {
                label: "Venn Diagram",
              },
              {
                label: "Cubes",
              },
              {
                label: "Logic Based DI",
              },
              {
                label: "Circular Arrangement",
              },
              {
                label: "Selection",
              },
              {
                label: "Binary Logic",
              },
              {
                label: "Puzzles",
              },
              {
                label: "Coding-Decoding",
              },
              {
                label: "Quant Based Reasoning",
              },
              {
                label: "Selection",
              },
              {
                label: "Puzzles",
              },
              {
                label: "Linaer Arrangement",
              },
              {
                label: "Venn Diagram",
              },
              {
                label: "Logic Based DI",
              },
              {
                label: "Circular Arrangement",
              },
              {
                label: "Binary Logic",
              },
              {
                label: "Coding-Decoding",
              },
              {
                label: "Games & Tournaments",
              },
              {
                label: "Distribution",
              },
              {
                label: "Quant Based Reasoning",
              },
              {
                label: "Cause & Effect",
              },
              {
                label: "Arrangement",
              },
              {
                label: "Arrangement",
              },
            ],
          },
          {
            label: "Data Interpretation",
            children: [
              {
                label: "Line Graph",
              },
              {
                label: "Pie Chart",
              },
              {
                label: "Mixed Graph",
              },
              {
                label: "Bar Graph",
              },
              {
                label: "Quant Based DI",
              },
              {
                label: "Line Graph",
              },
              {
                label: "Venn Diagram",
              },
              {
                label: "Quant Based DI",
              },
              {
                label: "Tables",
              },
              {
                label: "Caselets",
              },
              {
                label: "Network & Flow Diagram",
              },
              {
                label: "Venn Diagram",
              },
              {
                label: "Tables",
              },
              {
                label: "Bar Graph",
              },
              {
                label: "Pie Chart",
              },
              {
                label: "Mixed Graph",
              },
              {
                label: "Caselets",
              },
              {
                label: "Network & Flow Diagram",
              },
            ],
          },
        ],
      },
    ],
  },
];

  return (
    <Tree
      lineWidth={"2px"}
      lineColor={"grey"}
      lineBorderRadius={"10px"}

    
      label={
        <StyledNode className="tree-node text-sm  font-inter mx-auto">
          {organizationData[0].label}
        </StyledNode>
      }
    >
      <RenderTree  data={organizationData[0].children} />
    </Tree>
  );
}

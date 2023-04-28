import { Box, Typography, BoxProps } from "@mui/material";
import { IProduct } from "@/interfaces";
import { styled } from "@mui/material/styles";

interface IProductData {
  data: IProduct;
}

const ProductBox = styled(Box)<BoxProps>(({ theme }) => ({
  width: 300,
  border: "1px solid #ccc",
  borderRadius: "10px",
  padding: "10px",
  minHeight: "100%",
}));

export const StyledProduct = ({ data }: IProductData) => {
  return (
    <ProductBox>
      <Typography variant="h4" style={{ color: "tomato" }}>
        {data.id}
      </Typography>
      <Typography variant="h3">{data.title}</Typography>
      <Typography variant="body1">{data.description}</Typography>
      <Typography variant="body2">CATEGORY: {data.category}</Typography>
      <Typography variant="h4">{data.price}</Typography>
    </ProductBox>
  );
};

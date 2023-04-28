import { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  Pagination,
  Slider,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { GetStaticProps } from "next";
import useSWR from "swr";
import { IProduct } from "@/interfaces";
import { StyledProduct } from "../../components";
import { useDebounce } from "./../../hooks/useDebounce";

const fetcher = async (url: string): Promise<any> => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.", {});
    throw error;
  }

  return res.json();
};

interface IProps {
  categories: string[];
  products: IProduct[];
}

const ProductsPage = ({ categories, products }: IProps): JSX.Element => {
  // initial products
  const [productsList, setProductsList] = useState<IProduct[]>(products);
  const [filteredProducts, setfilteredProducts] = useState<IProduct[]>([]);
  const [paginationPages, setPaginationPages] = useState<number>(
    products.length
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceValues, setPriceValues] = useState<number[]>([0, 2000]);
  const [notFound, setNotFound] = useState<boolean>(false);
  const debouncePriceValues = useDebounce<number[]>(priceValues, 500);

  // FILTERS

  // category
  const handleChangeCategory = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value as string);
  };

  const {
    data: categoriesList,
    error: categoriesError,
    isLoading: categoriesIsLoading,
  } = useSWR(
    "https://630f034d498924524a83f7ef.mockapi.io/categories",
    fetcher,
    {
      fallbackData: categories,
    }
  );

  // price
  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceValues(newValue as number[]);
  };

  const applyFilters = async () => {
    const currentCategory = selectedCategory === "all" ? "" : selectedCategory;

    const selectedCategoryProducts = await fetch(
      `https://630f034d498924524a83f7ef.mockapi.io/products?filter=${currentCategory}`
    );

    const selectedCategoryResponse = await selectedCategoryProducts.json();

    const filteredByPriceProducts = selectedCategoryResponse.filter(
      (product: IProduct) =>
        product.price >= priceValues[0] && product.price <= priceValues[1]
    );

    if (filteredByPriceProducts.length > 0) {
      setNotFound(false);
      setfilteredProducts(filteredByPriceProducts);
      setProductsList(filteredProducts);
      setPaginationPages(
        Math.ceil(filteredByPriceProducts.length / 10) > 0
          ? Math.ceil(filteredByPriceProducts.length / 10)
          : 1
      );
    } else {
      setNotFound(true);
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////

  // pagination
  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    setCurrentPage(value);
  };

  useEffect(() => {
    if (filteredProducts.length > 0) {
      const filteredProductsCopy = [...filteredProducts];
      const productsOnPage = filteredProductsCopy.splice(
        (currentPage - 1) * 10,
        10
      );
      setProductsList(productsOnPage);
      if (currentPage * 10 > filteredProducts.length) {
        setCurrentPage(paginationPages);
      }
    } else {
      fetch(
        `https://630f034d498924524a83f7ef.mockapi.io/products?page=${currentPage}&limit=10`
      )
        .then((res) => res.json())
        .then((data) => {
          setProductsList(data);
        });
    }
  }, [currentPage, filteredProducts]);

  return (
    <>
      <Typography variant="h2">Products page</Typography>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
        corporis ea consequuntur rem id nulla doloremque culpa iste aliquid
        iusto eius, fugiat sit pariatur impedit voluptatibus reprehenderit sed
        debitis enim.
      </p>

      <Grid container spacing={2}>
        <Grid xs={4}>
          <form>
            <Typography variant="h3">Filters</Typography>
            <br />
            <FormControl fullWidth>
              <InputLabel htmlFor="category" shrink>
                Products Category
              </InputLabel>
              <Select
                id="category"
                value={selectedCategory}
                inputProps={{ "aria-label": "Without label" }}
                onChange={handleChangeCategory}
              >
                {categoriesList.map((item: string) => (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={priceValues}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              max={2000}
            />
            <br />
            <br />
            <Button onClick={applyFilters} variant="outlined" fullWidth>
              Apply Filters
            </Button>
          </form>
        </Grid>
        <Grid xs={8}>
          {!notFound ? (
            <>
              <ul style={{ display: "flex", flexWrap: "wrap" }}>
                {productsList.map((product: IProduct) => (
                  <li key={product.id} style={{ margin: "2px" }}>
                    <StyledProduct data={{ ...product }} />
                  </li>
                ))}
              </ul>
              <Pagination
                count={paginationPages}
                page={currentPage}
                variant="outlined"
                shape="rounded"
                onChange={handlePagination}
              />
            </>
          ) : (
            <h2
              style={{ fontSize: "3rem", fontWeight: "700", padding: "30px 0" }}
            >
              Products not Found!
            </h2>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const categoriesResponse = await fetch(
      "https://630f034d498924524a83f7ef.mockapi.io/categories"
    );
    const categories: string[] = await categoriesResponse.json();

    const productsResponse = await fetch(
      "https://630f034d498924524a83f7ef.mockapi.io/products?page=1&limit=10"
    );

    const products: IProduct[] = await productsResponse.json();

    return {
      props: {
        categories,
        products,
      },
      revalidate: 604800,
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default ProductsPage;

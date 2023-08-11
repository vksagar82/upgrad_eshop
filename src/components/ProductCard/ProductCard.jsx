import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import "./ProductCard.css";

//MUI Components
import MuiButtonBuyProduct from "../../components/MuiComponents/Buttons/MuiButtonBuyProduct";

function ProductCard(props) {
  const { productData, isAdmin, handleDeleteCall, navigate } = props;
  const key = props.productData.id;

  return (
    <Grid key={key} item xs={4}>
      <Card>
        <CardMedia
          sx={{ height: 150 }}
          image={
            productData.imageUrl.length > 0
              ? productData.imageUrl
              : "https://via.placeholder.com/600/771796"
          }
          title={productData.name}
        />
        <CardContent sx={{ height: 150 }}>
          <div className=".card-content">
            <Typography gutterBottom variant="h5" component="div">
              {productData.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              ₹{productData.price}
            </Typography>
          </div>
          <Typography variant="body2" color="text.secondary">
            {productData.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            alignSelf: "stretch",
            display: "flex",
            justifyContent: isAdmin ? "space-between" : "flex-start",
            margin: "0 10px",
          }}
        >
          <div>
            <MuiButtonBuyProduct
              onClick={() => navigate(`/products/${productData.id}`)}
              value="Buy"
            />
          </div>
          {isAdmin && (
            <div>
              <IconButton onClick={handleDeleteCall}>
                <DeleteIcon />
              </IconButton>
              <IconButton
                onClick={() => navigate(`/edit-product/${productData.id}`)}
              >
                <EditIcon />
              </IconButton>
            </div>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}

export default ProductCard;

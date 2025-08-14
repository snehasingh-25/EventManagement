
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: (props) => (props.expand ? "rotate(180deg)" : "rotate(0deg)"),
}));

const CardWrapper = ({ 
  title, 
  subheader, 
  avatar, 
  image, 
  children, 
  actions, 
  expandable = false 
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => setExpanded(!expanded);

  return (
    <Card sx={{ maxWidth: 400, margin: 2 }}>
      {(title || avatar || subheader) && (
        <CardHeader avatar={avatar} title={title} subheader={subheader} />
      )}
      {image && <CardMedia component="img" height="194" image={image} alt={title} />}
      <CardContent>{children}</CardContent>

      {actions && <CardActions disableSpacing>{actions}</CardActions>}

      {expandable && (
        <>
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography>More details...</Typography>
            </CardContent>
          </Collapse>
        </>
      )}
    </Card>
  );
};

export default CardWrapper;

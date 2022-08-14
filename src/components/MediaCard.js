import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function MediaCard({ draft, onEdit }) {
  return (
    <Card sx={{ width: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {draft.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {draft.desc}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container spacing={1} direction="row">
          <Grid item xs>
            <Button
              fullWidth
              variant="outlined"
              size="medium"
              onClick={(event) => onEdit(draft)}
              startIcon={<EditIcon />}
            />
          </Grid>
          <Grid item xs>
            <Button
              fullWidth
              variant="outlined"
              size="medium"
              startIcon={<DeleteIcon />}
            />
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}

export default MediaCard;

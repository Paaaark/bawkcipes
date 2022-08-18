import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

function DraftCard({ draft, onEdit, onDelete }) {
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <Card
      sx={{
        width: 345,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
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
          <Grid item xs align="center">
            <IconButton size="medium" onClick={(event) => onEdit(draft)}>
              <EditIcon />
            </IconButton>
          </Grid>
          <Grid item xs align="center">
            <IconButton size="medium" onClick={(event) => setOpenDialog(true)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
      <Dialog
        open={openDialog}
        onClose={(event) => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">{"Delete the draft?"}</DialogTitle>
        <DialogActions>
          <Button onClick={(event) => setOpenDialog(false)}>No</Button>
          <Button
            onClick={(event) => {
              onDelete(draft);
              setOpenDialog(false);
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default DraftCard;

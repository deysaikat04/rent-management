import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LoadingButton from "@mui/lab/LoadingButton";
import DoneIcon from "@mui/icons-material/Done";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@mui/material/Avatar";
import pdfIcon from "../pdf_icon.png";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../config/fbConfig";
import { addDocs } from "../store/actions/documentAction";
import { withStyles } from "@mui/styles";

const styles = (theme) => ({
  header: {
    marginRight: "10px",
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "auto",
    padding: "20px",
    marginTop: "20px",
    boxShadow: "1px 1px 12px #e2e2e2cc",
  },
  button: {
    padding: "20px 0",
    borderRadius: "50%",
  },
  imagePreview: {
    width: "auto",
    height: "auto",
    maxWidth: 260,
  },
  progress: {
    position: "relative",
    top: "24px",
  },
  fileName: {
    margin: "15px 0",
  },
});

const ImageUpload = (props) => {
  const { classes, getImageUrl, userId, tenantId } = props;

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [fileType, setFileType] = useState("image");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    if (selectedFile.type === "application/pdf") {
      setFileType("pdf");
    } else {
      setFileType("image");
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    setProgress(0);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = () => {
    const storageRef = projectStorage.ref(selectedFile.name);

    storageRef.put(selectedFile).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        // getImageUrl(url);
        const uploadObj = [url];

        setUrl(url);
        reset();
      }
    );
  };

  const reset = () => {
    setSelectedFile(null);
    setPreview(null);
    setFileType("image");
    setProgress(0);
    setError(null);
    setUrl(null);
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={3} md={2} lg={2}>
          <input
            type="file"
            style={{ display: "none" }}
            id="contained-button-file"
            onChange={onSelectFile}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="outlined"
              color="secondary"
              component="span"
              size="small"
            >
              Choose
            </Button>
          </label>
        </Grid>
        {!selectedFile && <p>No file chosen</p>}
        {selectedFile && (
          <>
            <Grid
              item
              xs={5}
              md={8}
              lg={8}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div>
                {fileType === "pdf" ? (
                  <img src={pdfIcon} alt="" width="40" height="50" />
                ) : (
                  <Avatar
                    alt="Remy Sharp"
                    variant="square"
                    src={preview}
                    sx={{ width: 100, height: 100 }}
                  />
                )}
                <div className={classes.fileName}>
                  {selectedFile && selectedFile.name}
                </div>
              </div>
            </Grid>
            <Grid item xs={3} md={2} lg={2}>
              {progress === 0 && (
                <>
                  <IconButton
                    color="secondary"
                    aria-label="upload picture"
                    component="span"
                    style={{
                      border: "1px solid #ccc",
                      margin: "10px 10px 10px 0",
                    }}
                    onClick={uploadFile}
                  >
                    <CloudUploadIcon />
                  </IconButton>
                  <IconButton
                    color="default"
                    aria-label="upload picture"
                    component="span"
                    style={{ border: "1px solid #ccc" }}
                    onClick={reset}
                  >
                    <ClearIcon />
                  </IconButton>
                </>
              )}
              {progress < 100 && progress > 0 && (
                <LoadingButton loading variant="outlined">
                  <DoneIcon />
                </LoadingButton>
              )}
              {progress === 100 && (
                <LoadingButton variant="outlined">
                  <DoneIcon />
                </LoadingButton>
              )}
            </Grid>
          </>
        )}
      </Grid>

      {/* 

      <LinearProgress
        variant="determinate"
        value={23}
        className={classes.progress}
        color="primary"
      />
      <Paper className={classes.paper}>
        {selectedFile && <img src={preview} className={classes.imagePreview} />}
      </Paper> */}
    </div>
  );
};

export default withStyles(styles)(ImageUpload);

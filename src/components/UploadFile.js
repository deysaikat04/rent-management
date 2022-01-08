import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LoadingButton from "@mui/lab/LoadingButton";
import DoneIcon from "@mui/icons-material/Done";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { compose } from "redux";
import Grid from "@material-ui/core/Grid";
import Avatar from "@mui/material/Avatar";
import { connect } from "react-redux";
import pdfIcon from "../pdf_icon.png";
import { projectStorage } from "../config/fbConfig";
import { addDocs, fetchDocs } from "../store/actions/documentAction";

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
  uploadedImage: {
    width: "250px",
    height: "300px",
    objectFit: "contain",
    padding: "16px",
    border: "1px solid #eee",
  },
  uploadedItems: {
    marginTop: "16px",
    padding: "10px",
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    padding: "16px",
  },
  remove: {
    position: "relative",
    top: "30px",
    right: "50px",
    textAlign: "right",
  },
  removeIcon: {
    color: "#e57373",
  },
});

class UploadFile extends Component {
  state = {
    selectedFile: null,
    preview: null,
    fileType: "image",
    progress: 0,
    error: null,
    url: "",
    documents: [],
    uploading: false,
  };

  componentDidMount = () => {
    this.props.fetchDocs(this.props.userId, this.props.tenantId);
  };

  componentWillUnmount = () => {
    URL.revokeObjectURL(this.state.preview);
  };

  onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      this.setState({ selectedFile: undefined });
      return;
    }
    if (e.target.files[0].type === "application/pdf") {
      this.setState({ fileType: "pdf" });
    } else {
      this.setState({ fileType: "image" });
    }

    const objectUrl = URL.createObjectURL(e.target.files[0]);
    this.setState({ preview: objectUrl, progress: 0 });
    this.setState({ selectedFile: e.target.files[0] });
  };

  uploadFile = () => {
    const { selectedFile, fileType } = this.state;
    const { userId, tenantId, files } = this.props;
    const storageRef = projectStorage.ref(selectedFile.name);
    let uploadObj;

    this.setState({ uploading: true });

    storageRef.put(selectedFile).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        this.setState({ progress: percentage });
      },
      (err) => {
        this.setState({ error: err });
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        let newObj = {
          id: uuidv4(),
          type: fileType,
          url,
          name: selectedFile.name,
        };
        if (files.length) {
          uploadObj = [newObj, ...files];
        } else {
          uploadObj = [newObj];
        }
        this.props.addDocs(uploadObj, userId, tenantId);
        this.props.fetchDocs(userId, tenantId);
        this.setState({ url });
        this.reset();
      }
    );
  };

  removeFile = (item) => {
    const { userId, tenantId, files } = this.props;

    const updatedList = files.filter((file) => file.id !== item.id);

    try {
      let imageRef = projectStorage.refFromURL(item.url);
      imageRef.delete();
    } catch (error) {
      console.log(error);
    }

    this.props.addDocs(updatedList, userId, tenantId);

    setTimeout(() => {
      this.props.fetchDocs(userId, tenantId);
    }, 1500);
  };

  reset = () => {
    this.setState({
      selectedFile: null,
      preview: null,
      fileType: "image",
      progress: 0,
      error: null,
      url: "",
      uploading: false,
    });
  };

  render() {
    const { classes, files } = this.props;
    const { selectedFile, preview, fileType, progress, uploading } = this.state;
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={3} md={2} lg={2} style={{ marginBottom: "16px" }}>
            <input
              type="file"
              style={{ display: "none" }}
              id="contained-button-file"
              onChange={this.onSelectFile}
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
                    <img src={pdfIcon} alt="pdf_icon" width="40" height="50" />
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
                      onClick={this.uploadFile}
                    >
                      <CloudUploadIcon />
                    </IconButton>
                    <IconButton
                      color="default"
                      aria-label="upload picture"
                      component="span"
                      style={{ border: "1px solid #ccc" }}
                      onClick={this.reset}
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
        {uploading && selectedFile ? (
          <Box className={classes.loader}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {files &&
              files.map((item) =>
                item.type === "image" ? (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    lg={3}
                    style={{ textAlign: "center" }}
                    key={item.id}
                  >
                    <div className={classes.remove}>
                      <IconButton
                        aria-label="upload picture"
                        component="p"
                        onClick={() => this.removeFile(item)}
                      >
                        <HighlightOffIcon className={classes.removeIcon} />
                      </IconButton>
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer nooperner"
                      className={classes.uploadedItems}
                    >
                      <img
                        src={item.url}
                        alt="tenant_files"
                        className={classes.uploadedImage}
                      />
                    </a>
                  </Grid>
                ) : (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    lg={3}
                    style={{ textAlign: "center" }}
                    key={item.id}
                  >
                    <div style={{ marginTop: "20px" }}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer nooperner"
                        className={classes.uploadedItems}
                      >
                        <img
                          src={pdfIcon}
                          alt="pdf_icon"
                          width="140"
                          height="150"
                        />
                      </a>
                      <p>{item.name}</p>
                    </div>
                  </Grid>
                )
              )}
          </Grid>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    files: state.documents.files,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addDocs: (uploadObj, userId, tenantId) =>
      dispatch(addDocs(uploadObj, userId, tenantId)),
    fetchDocs: (userId, tenantId) => dispatch(fetchDocs(userId, tenantId)),
  };
};

export default withStyles(styles, { withTheme: true })(
  compose(connect(mapStateToProps, mapDispatchToProps))(UploadFile)
);

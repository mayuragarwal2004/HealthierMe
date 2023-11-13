import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { useData } from "../context/data/DataState";
import { useNavigate } from "react-router-dom";
import "./AdminHome.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";

const AdminHome = () => {
  const { data, setcommunityNo, seteditFlag } = useData();
  const creatorAndAdminCommunities = data.community
    .map((community, index) => ({ ...community, index }))
    .filter(
      (community) => community.role === "Creator" || community.role === "Admin"
    );

  const navigate = useNavigate();

  const handleCreateCommunity = () => {
    seteditFlag(false);
    navigate("/admin/form");
  };

  const handleEditCommunity = (index) => {
    setcommunityNo(index);
    seteditFlag(true);
    navigate("/admin/form");
  };

  const handleViewCommunity = (index) => {
    setcommunityNo(index);
    seteditFlag(false);
    navigate("/");
  };

  return (
    <div className="admin-home-parent">
      <div className="create-community-button">
        <Button variant="contained" color="primary" endIcon={<AddIcon />} onClick={handleCreateCommunity}>
          Create Community
        </Button>
      </div>
      <div className="community-card-parent">
        {creatorAndAdminCommunities.map((community) => (
          <div key={community.id} className="community-card">
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {community.cName[0]}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={community.cName}
                subheader={"You are " + community.role}
              />
              {/* <CardMedia
                component="img"
                height="194"
                image="/static/images/cards/paella.jpg"
                alt="Paella dish"
              /> */}
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {community.cDesc}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  aria-label="edit community"
                  onClick={() => handleEditCommunity(community.index)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="view"
                  onClick={() => handleViewCommunity(community.index)}
                >
                  <VisibilityIcon />
                </IconButton>
                <IconButton aria-label="share" style={{ marginLeft: "auto" }}>
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;

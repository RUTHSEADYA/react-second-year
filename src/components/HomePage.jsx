import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { useSelector } from "react-redux";

const FullScreenVideo = () => {
  const { currentUser } = useSelector((state) => state.user);

  const suppliers = [
    { name: "צלמים", src: "src/photo/photographers/23.png" },
    { name: "אולמות", src: "src/photo/halls/sh2pnim_max_475px(3).webp" },
    { name: "קייטרינג", src: "src/photo/catering/IMG_4266-Medium.jpg" },
    { name: "זמרים", src: "src/photo/singers/173338.jpg" },
    { name: "מעצבים", src: "src/photo/flowers/660b54b37f7656ead49d45e27c7412e6.jpg" },
    { name: "מפיקים", src: "src/photo/producers/10.png" },
  ];

  return (
    <Box sx={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <Box
        sx={{
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      >
        <img
          src="src/photo/קולולו (5).png"
          alt="לוגו"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "contain",
          }}
        />
      </Box>

      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
        }}
      >
        <source src="src/photo/עיצוב ללא שם (1).mp4" type="video/mp4" />
        הדפדפן שלך אינו תומך בוידאו.
      </video>

      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          zIndex: 2,
        }}
      >
        {suppliers.map((supplier, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "rgba(0, 0, 0, 0.7)",
                width: "70px",
                height: "70px",
                boxShadow: "0 0 0 4px black, 0 0 0 6px gold",
              }}
            >
              {supplier.src ? (
                <img
                  src={supplier.src}
                  alt={supplier.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "30px",
                  }}
                >
                  {supplier.icon || ""}
                </Typography>
              )}
            </Avatar>
            <Typography
              sx={{
                marginTop: "5px",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {supplier.name}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* כיתוב על הווידאו */}
      <Box
        sx={{
          position: "absolute",
          left: "15%",
          bottom: "25%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "#fff",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          maxWidth: "70%",
          zIndex: 2,
        }}
      >
        {currentUser?.username ? (
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            שלום {currentUser.username}, ברוך הבא למערכת שלנו
            <br />
            בואו להנות מכל האפשרויות שלנו
          </Typography>
        ) : (
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            מגוון רחב של ספקים מהשורה הראשונה
            <br />
            בואו לארגן את החתונה שלכם תוך יום אחד
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default FullScreenVideo;

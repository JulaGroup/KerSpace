"use client";
import { API_URL } from "@/config/constat";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import { alpha } from "@mui/material/styles";

// Import icons for details
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import UpdateIcon from "@mui/icons-material/Update";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import HomeIcon from "@mui/icons-material/Home";
import SellIcon from "@mui/icons-material/Sell";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import FlagIcon from "@mui/icons-material/Flag";

interface Property {
  _id: string;
  title: string;
  location: {
    address: string;
    city: string;
    state?: string;
    country?: string;
    phone?: string;
    coordinates?: {
      lat?: number;
      lng?: number;
    };
  };
  price: number;
  bedrooms: number;
  bathrooms: number;
  size: number;
  images: string[];
  featured?: boolean;
  approvalStatus?: "pending" | "approved" | "rejected";
  createdAt?: string;
  updatedAt?: string;
  description?: string;
  status?: string;
  type?: string;
  available?: boolean;
  totalUnits?: number;
  availableUnits?: number;
}

export default function SpecificProperty() {
  const params = useParams();
  const router = useRouter();
  const { id } = params as { id: string };
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  useEffect(() => {
    async function fetchProperty() {
      setLoading(true);
      try {
        const res = await axios.get(
          `${API_URL}/api/properties/${id}` // Use API_URL constant
        );
        setProperty(res.data);
      } catch (err) {
        console.error("Failed to fetch property:", err);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProperty();
  }, [id]);

  useEffect(() => {
    setSelectedImageIdx(0);
  }, [property]);

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={(theme) => ({
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.1
          )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          backdropFilter: "blur(20px)",
        })}
      >
        <Box
          sx={(theme) => ({
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `conic-gradient(from 0deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
              borderRadius: "50%",
              padding: "3px",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "xor",
              animation: "spin 2s linear infinite",
            },
            "@keyframes spin": {
              "0%": { transform: "rotate(0deg)" },
              "100%": { transform: "rotate(360deg)" },
            },
          })}
        >
          <CircularProgress
            size={80}
            thickness={1.5}
            sx={{
              color: "transparent",
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />
        </Box>
        <Typography
          variant="h6"
          sx={(theme) => ({
            mt: 4,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 600,
            letterSpacing: "0.5px",
          })}
        >
          Loading property details...
        </Typography>
      </Box>
    );
  }

  if (!property) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={(theme) => ({
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.error.main,
            0.1
          )} 0%, ${alpha(theme.palette.warning.main, 0.05)} 100%)`,
          p: 3,
        })}
      >
        <Card
          sx={(theme) => ({
            maxWidth: 400,
            textAlign: "center",
            backdropFilter: "blur(20px)",
            background: alpha(theme.palette.background.paper, 0.8),
            border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
            boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
          })}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h5"
              color="error"
              gutterBottom
              fontWeight={600}
            >
              Property Not Found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              The property you&apos;re looking for doesn&apos;t exist or an
              error occurred.
            </Typography>
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={() => router.back()}
              size="large"
              sx={(theme) => ({
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                boxShadow: `0 4px 20px ${alpha(
                  theme.palette.primary.main,
                  0.4
                )}`,
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: `0 6px 25px ${alpha(
                    theme.palette.primary.main,
                    0.5
                  )}`,
                },
              })}
            >
              Go Back
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box
      minHeight="100vh"
      sx={(theme) => ({
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.05
        )} 0%, ${alpha(theme.palette.secondary.main, 0.03)} 50%, ${alpha(
          theme.palette.background.default,
          1
        )} 100%)`,
        position: "relative",
        "&::before": {
          content: '""',
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 20% 80%, ${alpha(
            theme.palette.primary.main,
            0.1
          )} 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${alpha(
            theme.palette.secondary.main,
            0.1
          )} 0%, transparent 50%)`,
          pointerEvents: "none",
          zIndex: 0,
        },
      })}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1400px",
          mx: "auto",
          p: { xs: 2, sm: 3, md: 4, lg: 6 },
        }}
      >
        {/* Back Button */}
        <IconButton
          onClick={() => router.back()}
          sx={(theme) => ({
            mb: 3,
            bgcolor: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: "blur(20px)",
            border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
            "&:hover": {
              bgcolor: alpha(theme.palette.background.paper, 0.95),
              transform: "translateY(-1px)",
              boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.1)}`,
            },
            transition: "all 0.3s ease",
          })}
        >
          <ArrowBackIcon />
        </IconButton>

        {/* Main Content */}
        <Card
          sx={(theme) => ({
            borderRadius: 4,
            overflow: "hidden",
            backdropFilter: "blur(20px)",
            background: alpha(theme.palette.background.paper, 0.9),
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: `0 20px 60px ${alpha(theme.palette.common.black, 0.1)}`,
          })}
        >
          <Box display="flex" flexDirection="column">
            {/* Image Gallery */}
            <Box
              sx={(theme) => ({
                position: "relative",
                height: { xs: 400, sm: 500, md: 600 },
                background: `linear-gradient(45deg, ${alpha(
                  theme.palette.grey[900],
                  0.05
                )}, ${alpha(theme.palette.grey[800], 0.1)})`,
              })}
            >
              {property.images && property.images.length > 0 ? (
                <>
                  <Box
                    sx={(theme) => ({
                      position: "relative",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: alpha(theme.palette.grey[100], 0.5),
                    })}
                  >
                    <Image
                      src={property.images[selectedImageIdx]}
                      alt={property.title}
                      fill
                      style={{
                        objectFit: "contain",
                        padding: "8px",
                      }}
                      priority
                      sizes="100vw"
                    />
                  </Box>

                  {/* Thumbnail strip */}
                  {property.images.length > 1 && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 16,
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: "flex",
                        gap: 1,
                        overflow: "auto",
                        maxWidth: "calc(100% - 32px)",
                        "&::-webkit-scrollbar": { display: "none" },
                        scrollbarWidth: "none",
                        background: "rgba(0,0,0,0.3)",
                        backdropFilter: "blur(10px)",
                        borderRadius: 3,
                        p: 1.5,
                      }}
                    >
                      {property.images.map((img, idx) => (
                        <Box
                          key={idx}
                          onClick={() => setSelectedImageIdx(idx)}
                          sx={(theme) => ({
                            position: "relative",
                            width: 60,
                            height: 60,
                            borderRadius: 2,
                            overflow: "hidden",
                            cursor: "pointer",
                            border: selectedImageIdx === idx ? 3 : 2,
                            borderColor:
                              selectedImageIdx === idx
                                ? theme.palette.primary.main
                                : "rgba(255,255,255,0.5)",
                            opacity: selectedImageIdx === idx ? 1 : 0.7,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              opacity: 1,
                              transform: "scale(1.05)",
                            },
                            flexShrink: 0,
                          })}
                        >
                          <Image
                            src={img}
                            alt={`${property.title} ${idx + 1}`}
                            fill
                            style={{ objectFit: "cover" }}
                            sizes="60px"
                          />
                        </Box>
                      ))}
                    </Box>
                  )}
                </>
              ) : (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                  sx={(theme) => ({
                    color: theme.palette.text.secondary,
                    flexDirection: "column",
                    gap: 2,
                  })}
                >
                  <SquareFootIcon sx={{ fontSize: 60, opacity: 0.3 }} />
                  <Typography variant="h6" color="text.secondary">
                    No Images Available
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Property Details */}
            <Box
              sx={{
                p: { xs: 3, sm: 4, lg: 6 },
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Status Badges */}
              <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
                {property.featured && (
                  <Chip
                    label="✨ Featured"
                    sx={(theme) => ({
                      background: `linear-gradient(45deg, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`,
                      color: theme.palette.warning.contrastText,
                      fontWeight: 600,
                      borderRadius: 2,
                      "& .MuiChip-label": { px: 2 },
                    })}
                  />
                )}

                {property.approvalStatus === "approved" && (
                  <Chip
                    label="✅ Approved"
                    color="success"
                    sx={{ fontWeight: 600, borderRadius: 2 }}
                  />
                )}
                {property.approvalStatus === "rejected" && (
                  <Chip
                    label="❌ Rejected"
                    color="error"
                    sx={{ fontWeight: 600, borderRadius: 2 }}
                  />
                )}
                {property.approvalStatus === "pending" && (
                  <Chip
                    label="⏳ Pending"
                    color="warning"
                    sx={{ fontWeight: 600, borderRadius: 2 }}
                  />
                )}
                {/* Availability logic */}
                {property.type === "apartment" ? (
                  property.availableUnits === 0 ? (
                    <Chip
                      label="Fully Booked"
                      color="error"
                      sx={{ fontWeight: 600, borderRadius: 2 }}
                    />
                  ) : (
                    <Chip
                      label={`Available Units: ${
                        property.availableUnits ?? "-"
                      }`}
                      color="success"
                      sx={{ fontWeight: 600, borderRadius: 2 }}
                    />
                  )
                ) : property.available === false ? (
                  <Chip
                    label="Sold / Unavailable"
                    color="error"
                    sx={{ fontWeight: 600, borderRadius: 2 }}
                  />
                ) : (
                  <Chip
                    label="Available"
                    color="success"
                    sx={{ fontWeight: 600, borderRadius: 2 }}
                  />
                )}
                {property.status && (
                  <Chip
                    icon={<SellIcon />}
                    label={
                      property.status === "for-sale"
                        ? "For Sale"
                        : property.status
                    }
                    color="info"
                    sx={(theme) => ({
                      fontWeight: 600,
                      borderRadius: 2,
                      background: `linear-gradient(45deg, ${theme.palette.info.light}, ${theme.palette.info.main})`,
                      color: theme.palette.info.contrastText,
                    })}
                  />
                )}
                {property.type && (
                  <Chip
                    icon={<HomeIcon />}
                    label={
                      property.type.charAt(0).toUpperCase() +
                      property.type.slice(1)
                    }
                    sx={(theme) => ({
                      fontWeight: 600,
                      borderRadius: 2,
                      background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                      color: theme.palette.primary.contrastText,
                    })}
                  />
                )}
              </Box>

              {/* Title */}
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={(theme) => ({
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  mb: 2,
                  background: `linear-gradient(45deg, ${
                    theme.palette.text.primary
                  }, ${alpha(theme.palette.primary.main, 0.8)})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                })}
              >
                {property.title}
              </Typography>

              {/* Location */}
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                mb={3}
                flexWrap="wrap"
              >
                <LocationOnIcon
                  sx={(theme) => ({
                    color: theme.palette.primary.main,
                    fontSize: 20,
                  })}
                />
                <Typography
                  variant="h6"
                  sx={(theme) => ({
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                  })}
                >
                  {property.location.city}
                </Typography>
                {property.location.address && (
                  <>
                    <Typography variant="h6" color="text.secondary">
                      •
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {property.location.address}
                    </Typography>
                  </>
                )}
                {property.location.state && (
                  <>
                    <Typography variant="h6" color="text.secondary">
                      •
                    </Typography>
                    <FlagIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                    <Typography variant="h6" color="text.secondary">
                      {property.location.state}
                    </Typography>
                  </>
                )}
                {property.location.country && (
                  <>
                    <Typography variant="h6" color="text.secondary">
                      •
                    </Typography>
                    <PublicIcon
                      sx={{ fontSize: 18, color: "text.secondary" }}
                    />
                    <Typography variant="h6" color="text.secondary">
                      {property.location.country}
                    </Typography>
                  </>
                )}
                {property.location.phone && (
                  <>
                    <Typography variant="h6" color="text.secondary">
                      •
                    </Typography>
                    <PhoneIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                    <Typography variant="h6" color="text.secondary">
                      {property.location.phone}
                    </Typography>
                  </>
                )}
              </Box>

              {/* Price */}
              <Typography
                variant="h4"
                sx={(theme) => ({
                  fontWeight: 800,
                  mb: 4,
                  color: theme.palette.success.main,
                  letterSpacing: "-0.01em",
                })}
              >
                GMD {property.price.toLocaleString()}
              </Typography>

              {/* Description */}
              {property.description && (
                <Paper
                  elevation={0}
                  sx={(theme) => ({
                    mb: 4,
                    p: 3,
                    background: alpha(theme.palette.primary.light, 0.07),
                    borderRadius: 3,
                    border: `1px solid ${alpha(
                      theme.palette.primary.main,
                      0.08
                    )}`,
                  })}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: "1rem", md: "1.15rem" },
                      color: "text.primary",
                      fontWeight: 500,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {property.description}
                  </Typography>
                </Paper>
              )}

              {/* Property Features */}
              <Box
                display="grid"
                gridTemplateColumns="repeat(auto-fit, minmax(120px, 1fr))"
                gap={3}
                mb={4}
              >
                {/* Standard features */}
                <Card
                  sx={(theme) => ({
                    p: 2,
                    textAlign: "center",
                    background: alpha(theme.palette.primary.main, 0.05),
                    border: `1px solid ${alpha(
                      theme.palette.primary.main,
                      0.1
                    )}`,
                    borderRadius: 2,
                  })}
                >
                  <BedIcon
                    sx={(theme) => ({
                      color: theme.palette.primary.main,
                      fontSize: 28,
                      mb: 1,
                    })}
                  />
                  <Typography variant="h6" fontWeight={700}>
                    {property.bedrooms}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Bedrooms
                  </Typography>
                </Card>
                <Card
                  sx={(theme) => ({
                    p: 2,
                    textAlign: "center",
                    background: alpha(theme.palette.primary.main, 0.05),
                    border: `1px solid ${alpha(
                      theme.palette.primary.main,
                      0.1
                    )}`,
                    borderRadius: 2,
                  })}
                >
                  <BathtubIcon
                    sx={(theme) => ({
                      color: theme.palette.primary.main,
                      fontSize: 28,
                      mb: 1,
                    })}
                  />
                  <Typography variant="h6" fontWeight={700}>
                    {property.bathrooms}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Bathrooms
                  </Typography>
                </Card>
                <Card
                  sx={(theme) => ({
                    p: 2,
                    textAlign: "center",
                    background: alpha(theme.palette.primary.main, 0.05),
                    border: `1px solid ${alpha(
                      theme.palette.primary.main,
                      0.1
                    )}`,
                    borderRadius: 2,
                  })}
                >
                  <SquareFootIcon
                    sx={(theme) => ({
                      color: theme.palette.primary.main,
                      fontSize: 28,
                      mb: 1,
                    })}
                  />
                  <Typography variant="h6" fontWeight={700}>
                    {property.size}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Size (m²)
                  </Typography>
                </Card>
                {/* Apartment-specific features */}
                {property.type === "apartment" && (
                  <>
                    <Card
                      sx={(theme) => ({
                        p: 2,
                        textAlign: "center",
                        background: alpha(theme.palette.primary.main, 0.05),
                        border: `1px solid ${alpha(
                          theme.palette.primary.main,
                          0.1
                        )}`,
                        borderRadius: 2,
                      })}
                    >
                      <HomeIcon
                        sx={(theme) => ({
                          color: theme.palette.primary.main,
                          fontSize: 28,
                          mb: 1,
                        })}
                      />
                      <Typography variant="h6" fontWeight={700}>
                        {property.totalUnits ?? "-"}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Total Units
                      </Typography>
                    </Card>
                    <Card
                      sx={(theme) => ({
                        p: 2,
                        textAlign: "center",
                        background: alpha(theme.palette.primary.main, 0.05),
                        border: `1px solid ${alpha(
                          theme.palette.primary.main,
                          0.1
                        )}`,
                        borderRadius: 2,
                      })}
                    >
                      <HomeIcon
                        sx={(theme) => ({
                          color: theme.palette.success.main,
                          fontSize: 28,
                          mb: 1,
                        })}
                      />
                      <Typography variant="h6" fontWeight={700}>
                        {property.availableUnits ?? "-"}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Available Units
                      </Typography>
                    </Card>
                  </>
                )}
              </Box>

              {/* Divider */}
              <Divider sx={{ my: 3 }} />

              {/* Property Information */}
              <Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Property Information
                </Typography>

                {[
                  {
                    icon: FingerprintIcon,
                    label: "Property ID",
                    value: property._id,
                  },
                  {
                    icon: CalendarTodayIcon,
                    label: "Listed",
                    value: property.createdAt
                      ? new Date(property.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "-",
                  },
                  {
                    icon: UpdateIcon,
                    label: "Last Updated",
                    value: property.updatedAt
                      ? new Date(property.updatedAt).toLocaleDateString(
                          "en-GB",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "-",
                  },
                  property.status
                    ? {
                        icon: SellIcon,
                        label: "Status",
                        value:
                          property.status === "for-sale"
                            ? "For Sale"
                            : property.status,
                      }
                    : null,
                  property.type
                    ? {
                        icon: HomeIcon,
                        label: "Type",
                        value:
                          property.type.charAt(0).toUpperCase() +
                          property.type.slice(1),
                      }
                    : null,
                  property.location.country
                    ? {
                        icon: PublicIcon,
                        label: "Country",
                        value: property.location.country,
                      }
                    : null,
                  property.location.state
                    ? {
                        icon: FlagIcon,
                        label: "State",
                        value: property.location.state,
                      }
                    : null,
                  property.location.phone
                    ? {
                        icon: PhoneIcon,
                        label: "Contact",
                        value: property.location.phone,
                      }
                    : null,
                ]
                  .filter(Boolean)
                  .map((info, idx) =>
                    info ? (
                      <Box
                        key={idx}
                        display="flex"
                        alignItems="center"
                        gap={2}
                        py={1.5}
                        sx={(theme) => ({
                          borderBottom:
                            idx < 2
                              ? `1px solid ${alpha(theme.palette.divider, 0.5)}`
                              : "none",
                        })}
                      >
                        <info.icon
                          sx={(theme) => ({
                            color: theme.palette.text.secondary,
                            fontSize: 20,
                          })}
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ minWidth: 100 }}
                        >
                          {info.label}:
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                          {info.value}
                        </Typography>
                      </Box>
                    ) : null
                  )}
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}

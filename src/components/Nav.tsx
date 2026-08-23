import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { SvgIconComponent } from '@mui/icons-material';
import { Color } from '../colors';

interface Props {
  window?: () => Window;
  navItems: string[];
  activeItem: string;
  onNavChange: (item: string) => void;
}

const drawerWidth = 270;

// Best-effort icon match by nav label so items feel labeled rather than generic.
// Falls back to a small dot marker when nothing matches — keeps every row aligned.
const iconMap: { keywords: string[]; Icon: SvgIconComponent }[] = [
  { keywords: ['home'], Icon: HomeRoundedIcon },
  { keywords: ['about', 'story'], Icon: InfoRoundedIcon },
  { keywords: ['work', 'project', 'portfolio', 'case'], Icon: WorkRoundedIcon },
  { keywords: ['service', 'solution'], Icon: BuildRoundedIcon },
  { keywords: ['gallery', 'photo'], Icon: CollectionsRoundedIcon },
  { keywords: ['blog', 'news', 'article'], Icon: ArticleRoundedIcon },
  { keywords: ['team', 'people', 'staff'], Icon: GroupsRoundedIcon },
  { keywords: ['contact', 'reach'], Icon: MailRoundedIcon },
  { keywords: ['pricing', 'price', 'plan'], Icon: LocalOfferRoundedIcon },
  { keywords: ['faq', 'help', 'support'], Icon: HelpRoundedIcon },
  { keywords: ['login', 'sign in', 'signin'], Icon: LoginRoundedIcon },
  { keywords: ['signup', 'sign up', 'register', 'join'], Icon: PersonAddRoundedIcon },
  { keywords: ['dashboard', 'account'], Icon: DashboardRoundedIcon },
  { keywords: ['feature', 'why'], Icon: StarRoundedIcon },
  { keywords: ['application'], Icon: AppsRoundedIcon },
  { keywords: ['product'], Icon: Inventory2RoundedIcon },
  { keywords: ['setting', 'config'], Icon: SettingsRoundedIcon },
  { keywords: ['doc', 'document'], Icon: DescriptionRoundedIcon },
];

function getNavIcon(label: string): SvgIconComponent {
  const lower = label.toLowerCase();
  const match = iconMap.find(({ keywords }) => keywords.some((k) => lower.includes(k)));
  return match ? match.Icon : CircleRoundedIcon;
}

export default function Nav(props: Props) {
  const { window, navItems, activeItem, onNavChange } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  // Only the explicit close targets (backdrop, close icon, item click)
  // should ever close the drawer — nothing here relies on click bubbling,
  // which is what was re-opening the panel right after an item was picked.
  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const handleNavItemClick = (item: string) => {
    onNavChange(item);
    handleDrawerClose();
  };

  const drawer = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: '#0a0a0c',
        backgroundImage: `radial-gradient(circle at 15% 0%, color-mix(in srgb, ${Color.blueGrey} 20%, transparent), transparent 55%)`,
        color: 'white',
        overflow: 'hidden',
      }}
    >
      {/* Drawer header: logo + explicit close button */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2.5,
          py: 2.5,
        }}
      >
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="logo"
          sx={{ height: 34 }}
        />
        <IconButton
          onClick={handleDrawerClose}
          size="small"
          sx={{
            color: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(255,255,255,0.1)',
            backgroundColor: 'rgba(255,255,255,0.03)',
            transition: 'all 0.2s ease',
            '&:hover': {
              color: '#fff',
              backgroundColor: 'rgba(255,255,255,0.1)',
              transform: 'rotate(90deg)',
            },
          }}
          aria-label="Close navigation menu"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Divider sx={{ mx: 2.5, borderColor: 'rgba(255,255,255,0.08)' }} />

      <List sx={{ flexGrow: 1, px: 2, py: 2.5 }}>
        {navItems.map((item, idx) => {
          const isActive = activeItem === item;
          const Icon = getNavIcon(item);
          return (
            <ListItem
              key={item}
              disablePadding
              sx={{
                mb: 1,
                opacity: 0,
                animation: `navFadeIn 0.35s ease forwards`,
                animationDelay: `${idx * 45}ms`,
              }}
            >
              <ListItemButton
                onClick={() => handleNavItemClick(item)}
                sx={{
                  borderRadius: 2.5,
                  py: 1.1,
                  px: 1.5,
                  gap: 0.5,
                  position: 'relative',
                  backgroundColor: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
                  border: '1px solid',
                  borderColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                  transition: 'background-color 0.2s ease, border-color 0.2s ease, transform 0.15s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    transform: 'translateX(2px)',
                  },
                  '&:active': {
                    transform: 'scale(0.98)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    width: 36,
                    height: 36,
                    borderRadius: 1.75,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isActive ? Color.blueGrey : 'rgba(255,255,255,0.06)',
                    color: isActive ? '#0a0a0c' : 'rgba(255,255,255,0.7)',
                    boxShadow: isActive ? `0 0 16px 1px ${Color.blueGrey}66` : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{
                    sx: {
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.8)',
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '0.95rem',
                      letterSpacing: 0.15,
                      textAlign: 'left',
                    },
                  }}
                />
                {isActive && (
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: Color.blueGrey,
                      boxShadow: `0 0 8px 2px ${Color.blueGrey}aa`,
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Subtle footer accent so the panel doesn't end abruptly */}
      <Box
        sx={{
          px: 2.5,
          py: 2,
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <Box
          sx={{
            fontSize: '0.7rem',
            letterSpacing: 1,
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
          }}
        >
          Menu
        </Box>
      </Box>

      <style>{`
        @keyframes navFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          position: 'absolute',
          left: 0,
          width: '100%',
          zIndex: 10,
          padding: 1
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Burger Icon on the Left (mobile only) */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo on the Right for Mobile, Center for Desktop */}
          <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: { xs: 'flex-end', sm: 'flex-start' } }}>
            <Box
              component="img"
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt="logo"
              sx={{ height: 60, cursor: 'pointer' }}
              onClick={() => onNavChange('Home')}
            />
          </Box>

          {/* Desktop Nav Buttons — active item gets a circular/pill highlight */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 0.75 }}>
            {navItems.map((item) => {
              const isActive = activeItem === item;
              return (
                <Button
                  key={item}
                  onClick={() => handleNavItemClick(item)}
                  sx={{
                    color: isActive ? '#0a0a0c' : '#fff',
                    fontWeight: isActive ? 700 : 500,
                    borderRadius: '999px',
                    px: 2,
                    py: 0.6,
                    minWidth: 0,
                    backgroundColor: isActive ? Color.blueGrey : 'transparent',
                    boxShadow: isActive ? `0 0 16px 1px ${Color.blueGrey}66` : 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: isActive
                        ? Color.blueGrey
                        : 'rgba(255,255,255,0.08)',
                      color: isActive ? '#0a0a0c' : Color.blueGrey,
                    },
                  }}
                >
                  {item}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          container={window !== undefined ? () => window().document.body : undefined}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }}
          transitionDuration={280}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#0a0a0c',
              color: 'white',
              borderRight: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '12px 0 32px rgba(0,0,0,0.5)',
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
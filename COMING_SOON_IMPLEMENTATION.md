# Coming Soon Feature Implementation

## Overview
All games except ARC Raiders are now marked as "Coming Soon" with visual indicators throughout the website.

## Changes Made

### 1. Database Update
- Created `set-coming-soon.ts` script to update game status
- Set `isActive: false` for all games except ARC Raiders
- ARC Raiders remains `isActive: true`

### 2. UI Updates

#### Homepage (Popular Games Section)
- Added "Coming Soon" badge on inactive games
- Applied grayscale filter to inactive game images
- Disabled hover effects on inactive games
- Changed cursor to `not-allowed` for inactive games
- Shows "Available Soon" text instead of "Select Service"

#### Games Page
- Shows all games (both active and inactive)
- Added "Coming Soon" badge on inactive game cards
- Applied grayscale filter to inactive games
- Disabled navigation for inactive games
- Shows "Available Soon" text for inactive games

### 3. Visual Indicators

**Active Games (ARC Raiders only):**
- Full color images
- Hover effects enabled
- Clickable with navigation
- "View Services" call-to-action

**Inactive Games (Coming Soon):**
- "Coming Soon" badge in top-right corner
- Grayscale filter on images
- No hover scale effects
- Non-clickable (cursor: not-allowed)
- "Available Soon" text
- Reduced opacity (75%)

## Running the Script

To update game status:

```bash
npx tsx set-coming-soon.ts
```

## Current Status

✓ **Active Games:**
- ARC Raiders

⏳ **Coming Soon:**
- Valorant
- League of Legends
- Throne and Liberty
- World of Warcraft

## To Activate a Game

Update the database directly or modify the script:

```typescript
await prisma.gameService.update({
    where: { slug: 'game-slug' },
    data: { isActive: true }
})
```

## Files Modified

1. `set-coming-soon.ts` - Database update script
2. `components/home/popular-games.tsx` - Homepage game cards
3. `components/games/game-grid.tsx` - Games page grid
4. `app/games/page.tsx` - Games page query (now shows all games)

## Design Decisions

1. **Grayscale Filter**: Makes it immediately obvious which games are unavailable
2. **Badge Placement**: Top-right corner for high visibility
3. **Cursor Change**: Provides immediate feedback that game is not clickable
4. **Opacity Reduction**: Further emphasizes unavailability
5. **Show All Games**: Better for marketing - users can see what's coming

## Future Enhancements

- Add email notification signup for game launches
- Add estimated launch dates
- Add progress indicators for game development
- Add "Notify Me" button for coming soon games

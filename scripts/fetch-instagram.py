#!/usr/bin/env python3
"""
Instagram Thumbnail Fetcher
Fetches thumbnails from a public Instagram profile and creates JSON for the website.
Videos are linked directly to Instagram (no local hosting).

Usage:
    python scripts/fetch-instagram.py

Or with custom options:
    python scripts/fetch-instagram.py --username sudharsanan_kirubanandhan --limit 50
"""

import instaloader
import json
import os
import argparse
from datetime import datetime
from pathlib import Path

# Configuration
DEFAULT_USERNAME = "sudharsanan_kirubanandhan"
DEFAULT_LIMIT = 100
OUTPUT_DIR = Path(__file__).parent.parent / "public" / "instagram"
JSON_OUTPUT = Path(__file__).parent.parent / "src" / "data" / "instagram.json"


def fetch_instagram_posts(username: str, limit: int = DEFAULT_LIMIT):
    """Fetch video posts from Instagram profile (thumbnails only)."""

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Initialize instaloader - thumbnails only, no videos
    L = instaloader.Instaloader(
        download_videos=False,
        download_video_thumbnails=True,
        download_pictures=True,
        download_geotags=False,
        download_comments=False,
        save_metadata=False,
        compress_json=False,
        post_metadata_txt_pattern="",
        dirname_pattern=str(OUTPUT_DIR),
        filename_pattern="{shortcode}",
    )

    print(f"Fetching posts from @{username}...")

    try:
        profile = instaloader.Profile.from_username(L.context, username)
    except Exception as e:
        print(f"Error: Could not fetch profile. {e}")
        return []

    posts_data = []
    count = 0

    for post in profile.get_posts():
        if count >= limit:
            break

        # Only process videos (reels)
        if not post.is_video:
            continue

        print(f"Processing: {post.shortcode} ({count + 1})")

        try:
            # Check if thumbnail already exists
            existing_thumb = None
            for ext in ['.jpg', '.png', '.webp']:
                thumb_path = OUTPUT_DIR / f"{post.shortcode}{ext}"
                if thumb_path.exists():
                    existing_thumb = thumb_path.name
                    print(f"  Thumbnail exists: {existing_thumb}")
                    break

            # Download thumbnail if not exists
            if not existing_thumb:
                L.download_post(post, target="")
                # Find downloaded thumbnail
                for f in OUTPUT_DIR.iterdir():
                    if f.stem == post.shortcode and f.suffix in ['.jpg', '.png', '.webp']:
                        existing_thumb = f.name
                        break

            post_data = {
                "id": post.shortcode,
                "caption": (post.caption[:200] + "...") if post.caption and len(post.caption) > 200 else (post.caption or ""),
                "thumbnail": f"/instagram/{existing_thumb}" if existing_thumb else "",
                "permalink": f"https://www.instagram.com/reel/{post.shortcode}/",
                "date": post.date.strftime("%Y-%m-%d"),
                "likes": post.likes,
                "views": post.video_view_count or 0
            }

            posts_data.append(post_data)
            count += 1

        except Exception as e:
            print(f"  Error processing {post.shortcode}: {e}")
            continue

    return posts_data


def save_json(data: list):
    """Save posts data to JSON file."""
    data.sort(key=lambda x: x["date"], reverse=True)

    with open(JSON_OUTPUT, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"\nSaved {len(data)} posts to {JSON_OUTPUT}")


def clean_extra_files():
    """Remove non-image files."""
    for f in OUTPUT_DIR.iterdir():
        if f.suffix in ['.txt', '.json', '.xz', '.mp4']:
            f.unlink()
            print(f"Removed: {f.name}")


def main():
    parser = argparse.ArgumentParser(description="Fetch Instagram thumbnails")
    parser.add_argument("--username", "-u", default=DEFAULT_USERNAME, help="Instagram username")
    parser.add_argument("--limit", "-l", type=int, default=DEFAULT_LIMIT, help="Max posts to fetch")
    args = parser.parse_args()

    print(f"""
Instagram Thumbnail Fetcher
===========================
Username: @{args.username}
Limit: {args.limit} posts
Output: {OUTPUT_DIR}
JSON: {JSON_OUTPUT}

Note: Videos link directly to Instagram (no local hosting)
""")

    posts = fetch_instagram_posts(args.username, args.limit)

    if posts:
        save_json(posts)
        clean_extra_files()
        print(f"\nDone! Fetched {len(posts)} video thumbnails.")
        print("Run 'npm run dev' to preview.")
    else:
        print("\nNo videos found or error occurred.")


if __name__ == "__main__":
    main()

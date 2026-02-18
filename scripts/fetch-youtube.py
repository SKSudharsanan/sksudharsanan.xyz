#!/usr/bin/env python3
"""
YouTube Thumbnail Fetcher
Fetches thumbnails from a YouTube channel and creates JSON for the website.
Videos link directly to YouTube (no embedding).

Usage:
    python scripts/fetch-youtube.py

Or with custom options:
    python scripts/fetch-youtube.py --channel @sksudharsanan --limit 50
"""

import json
import os
import argparse
import subprocess
import urllib.request
from datetime import datetime
from pathlib import Path

# Configuration
DEFAULT_CHANNEL = "@sksudharsanan"
DEFAULT_LIMIT = 100
OUTPUT_DIR = Path(__file__).parent.parent / "public" / "youtube"
JSON_OUTPUT = Path(__file__).parent.parent / "src" / "data" / "youtube.json"


def fetch_youtube_videos(channel: str, limit: int = DEFAULT_LIMIT):
    """Fetch videos from YouTube channel using yt-dlp."""

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print(f"Fetching videos from {channel}...")

    # Use yt-dlp to get video metadata
    # Get yt-dlp path from virtual environment
    script_dir = Path(__file__).parent
    ytdlp_path = script_dir / ".venv" / "bin" / "yt-dlp"

    cmd = [
        str(ytdlp_path),
        "--flat-playlist",
        "--dump-json",
        "--playlist-end", str(limit),
        f"https://www.youtube.com/{channel}/videos"
    ]

    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=300
        )

        if result.returncode != 0:
            print(f"Error: {result.stderr}")
            return []

        videos_data = []
        lines = result.stdout.strip().split('\n')

        for i, line in enumerate(lines):
            if not line:
                continue

            try:
                video = json.loads(line)
                video_id = video.get('id', '')
                title = video.get('title', 'Untitled')

                print(f"Processing: {title[:50]}... ({i + 1}/{len(lines)})")

                # Download thumbnail
                thumb_filename = f"{video_id}.jpg"
                thumb_path = OUTPUT_DIR / thumb_filename

                if not thumb_path.exists():
                    # Try different thumbnail qualities
                    thumb_urls = [
                        f"https://img.youtube.com/vi/{video_id}/maxresdefault.jpg",
                        f"https://img.youtube.com/vi/{video_id}/hqdefault.jpg",
                        f"https://img.youtube.com/vi/{video_id}/mqdefault.jpg",
                    ]

                    for thumb_url in thumb_urls:
                        try:
                            urllib.request.urlretrieve(thumb_url, thumb_path)
                            # Check if we got a valid image (not the default "no thumbnail" image)
                            if thumb_path.stat().st_size > 1000:
                                break
                        except:
                            continue
                else:
                    print(f"  Thumbnail exists: {thumb_filename}")

                video_data = {
                    "id": video_id,
                    "title": title,
                    "thumbnail": f"/youtube/{thumb_filename}",
                    "url": f"https://www.youtube.com/watch?v={video_id}",
                    "duration": video.get('duration_string', ''),
                    "views": video.get('view_count', 0),
                }

                videos_data.append(video_data)

            except json.JSONDecodeError:
                continue
            except Exception as e:
                print(f"  Error: {e}")
                continue

        return videos_data

    except subprocess.TimeoutExpired:
        print("Error: Request timed out")
        return []
    except Exception as e:
        print(f"Error: {e}")
        return []


def save_json(data: list):
    """Save videos data to JSON file."""
    with open(JSON_OUTPUT, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"\nSaved {len(data)} videos to {JSON_OUTPUT}")


def main():
    parser = argparse.ArgumentParser(description="Fetch YouTube thumbnails")
    parser.add_argument("--channel", "-c", default=DEFAULT_CHANNEL, help="YouTube channel (e.g., @sksudharsanan)")
    parser.add_argument("--limit", "-l", type=int, default=DEFAULT_LIMIT, help="Max videos to fetch")
    args = parser.parse_args()

    print(f"""
YouTube Thumbnail Fetcher
=========================
Channel: {args.channel}
Limit: {args.limit} videos
Output: {OUTPUT_DIR}
JSON: {JSON_OUTPUT}

Note: Videos link directly to YouTube (no embedding)
""")

    videos = fetch_youtube_videos(args.channel, args.limit)

    if videos:
        save_json(videos)
        print(f"\nDone! Fetched {len(videos)} video thumbnails.")
        print("Run 'npm run dev' to preview.")
    else:
        print("\nNo videos found or error occurred.")


if __name__ == "__main__":
    main()

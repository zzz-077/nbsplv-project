export class randomIcons {
  public playlistIcons = [
    'fa-music',
    'fa-icons',
    'fa-headphones',
    'fa-play',
    'fa-record-vinyl',
    'fa-radio',
    'fa-volume-off',
    'fa-guitar',
    'fa-compact-disc',
    'fa-circle-play',
    'fa-sliders',
  ];

  public randomPlaylistIconGenerator() {
    let randomIcons = Math.floor(Math.random() * 11);
    return randomIcons;
  }
}

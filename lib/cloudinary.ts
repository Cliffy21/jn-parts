export function cdn(url: string, w = 1200) {
    if (!url) return "";
    return url.replace("/upload/", `/upload/f_auto,q_auto,w_${w}/`);
  }
  
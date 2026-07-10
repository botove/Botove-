// In-memory user database (replace with actual DB)
const users = new Map();

export class User {
  constructor(googleId, email, name, picture) {
    this.id = googleId;
    this.email = email;
    this.name = name;
    this.picture = picture;
    this.wins = 0;
    this.losses = 0;
    this.highScore = 0;
    this.createdAt = new Date();
  }

  addWin(score) {
    this.wins++;
    if (score > this.highScore) {
      this.highScore = score;
    }
  }

  addLoss() {
    this.losses++;
  }

  getStats() {
    const total = this.wins + this.losses;
    const winRate = total > 0 ? (this.wins / total) * 100 : 0;
    return {
      id: this.id,
      name: this.name,
      wins: this.wins,
      losses: this.losses,
      highScore: this.highScore,
      winRate: winRate.toFixed(1)
    };
  }
}

export function getOrCreateUser(googleId, userData) {
  if (users.has(googleId)) {
    return users.get(googleId);
  }

  const user = new User(googleId, userData.email, userData.name, userData.picture);
  users.set(googleId, user);
  return user;
}

export function getUser(googleId) {
  return users.get(googleId);
}

export function getAllUsers() {
  return Array.from(users.values()).sort((a, b) => b.wins - a.wins);
}

export function updateUserStats(googleId, won, score) {
  const user = users.get(googleId);
  if (user) {
    if (won) {
      user.addWin(score);
    } else {
      user.addLoss();
    }
  }
  return user;
}

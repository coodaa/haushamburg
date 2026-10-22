<template>
  <div class="google-reviews">

    <!-- Loading -->
    <div v-if="loading" class="reviews-loading">
      <div class="skeleton-header"></div>
      <div class="reviews-grid">
        <div v-for="n in 3" :key="n" class="skeleton-card"></div>
      </div>
    </div>

    <!-- Fehler -->
    <div v-else-if="error" class="reviews-error">
      <p>Bewertungen konnten nicht geladen werden.</p>
    </div>

    <!-- Inhalt -->
    <template v-else>
      <!-- Header -->
      <div class="reviews-header">
        <div class="overall-score">
          <span class="score-number">{{ rating }}</span>
          <div class="score-details">
            <div class="stars">
              <i v-for="n in 5" :key="n" class="fas" :class="starClass(n, parseFloat(rating))"></i>
            </div>
            <span class="review-count">{{ user_ratings_total }} Google-Bewertungen</span>
          </div>
        </div>
        <a
          href="https://www.google.com/maps/place/?q=place_id:ChIJq-rTSsFNtkcRiRBEvjNAGAE"
          target="_blank"
          rel="noopener noreferrer"
          class="google-badge"
          aria-label="Alle Bewertungen auf Google ansehen"
        >
          <svg class="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span>Alle ansehen</span>
        </a>
      </div>

      <!-- Review-Karten -->
      <div class="reviews-grid">
        <div v-for="review in goodReviews" :key="review.author_name" class="review-card">
          <div class="review-top">
            <div class="avatar-wrap">
              <img
                v-if="review.profile_photo_url"
                :src="review.profile_photo_url"
                :alt="review.author_name"
                class="reviewer-photo"
                loading="lazy"
                referrerpolicy="no-referrer"
                @error="(e) => e.target.style.display = 'none'"
              />
              <div class="reviewer-avatar">{{ review.author_name[0] }}</div>
            </div>
            <div class="reviewer-info">
              <span class="reviewer-name">{{ review.author_name }}</span>
              <span class="review-date">{{ review.relative_time_description }}</span>
            </div>
            <div class="review-stars-top">
              <i v-for="n in 5" :key="n" class="fas fa-star" :class="{ dim: n > review.rating }"></i>
            </div>
          </div>
          <p class="review-text" :class="{ expanded: review.expanded }">{{ review.text }}</p>
          <button
            v-if="review.text.length > 180"
            type="button"
            class="read-more"
            @click="review.expanded = !review.expanded"
          >
            {{ review.expanded ? 'Weniger anzeigen' : 'Mehr lesen' }}
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "GoogleReviews",
  data() {
    return {
      loading: true,
      error: false,
      rating: null,
      user_ratings_total: null,
      reviews: [],
    };
  },
  computed: {
    goodReviews() {
      return this.reviews.filter((r) => r.rating >= 4);
    },
  },
  async mounted() {
    try {
      const res = await fetch("/api/reviews");
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      this.rating = data.rating.toFixed(1);
      this.user_ratings_total = data.user_ratings_total;
      this.reviews = data.reviews.map((r) => ({ ...r, expanded: false }));
    } catch {
      this.error = true;
    } finally {
      this.loading = false;
    }
  },
  methods: {
    starClass(n, rating) {
      if (n <= Math.floor(rating)) return "fa-star";
      if (n < rating + 0.75) return "fa-star-half-alt";
      return "fa-star dim";
    },
  },
};
</script>

<style scoped>
.google-reviews {
  padding: 2rem 1rem;
  max-width: 1100px;
  margin: 0 auto;
}

/* Skeleton */
.skeleton-header {
  height: 70px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}
.skeleton-card {
  height: 180px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: 16px;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Fehler */
.reviews-error {
  text-align: center;
  padding: 2rem;
  color: #999;
  font-style: italic;
}

/* Header */
.reviews-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.2rem 1.5rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(3, 48, 93, 0.07);
}

.overall-score {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.score-number {
  font-family: var(--font-thunder);
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--blue);
  line-height: 1;
}

.score-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stars .fa-star,
.stars .fa-star-half-alt {
  color: var(--gold);
  font-size: 1.2rem;
}
.stars .fa-star.dim {
  color: #e0e0e0;
}

.review-count {
  font-size: 0.82rem;
  color: #888;
  margin-top: 0.1rem;
}

.google-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.1rem;
  border: 2px solid #e8e8e8;
  border-radius: 30px;
  text-decoration: none;
  color: var(--blue);
  font-size: 0.85rem;
  font-weight: 600;
  transition: border-color 0.2s ease, background 0.2s ease;
  white-space: nowrap;
}
.google-badge:hover {
  border-color: var(--gold);
  background: #fffdf3;
}
.google-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

/* Grid */
.reviews-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Karte */
.review-card {
  background: #fff;
  border-radius: 16px;
  padding: 1.3rem;
  box-shadow: 0 2px 12px rgba(3, 48, 93, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.review-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(3, 48, 93, 0.1);
}

/* Karten-Header */
.review-top {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.75rem;
}

/* Avatar Stack */
.avatar-wrap {
  position: relative;
  width: 46px;
  height: 46px;
  flex-shrink: 0;
}
.reviewer-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  z-index: 2;
}
.reviewer-avatar {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--blue);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  z-index: 1;
}

.reviewer-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.reviewer-name {
  font-weight: 700;
  color: var(--blue);
  font-size: 0.92rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.review-date {
  font-size: 0.75rem;
  color: #aaa;
  margin-top: 0.1rem;
}

.review-stars-top .fa-star {
  color: var(--gold);
  font-size: 0.8rem;
}
.review-stars-top .fa-star.dim {
  color: #e0e0e0;
}

/* Text */
.review-text {
  font-size: 0.9rem;
  line-height: 1.65;
  color: #555;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: all 0.3s ease;
}
.review-text.expanded {
  display: block;
  -webkit-line-clamp: unset;
}

.read-more {
  background: none;
  border: none;
  color: var(--blue);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
  text-underline-offset: 2px;
  align-self: flex-start;
}
.read-more:hover {
  color: var(--gold);
}

/* Responsive */
@media (min-width: 640px) {
  .reviews-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .reviews-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .google-reviews {
    padding: 2rem;
  }
}
</style>

FROM php:8.4-cli

# Install dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    libzip-dev \
    zip \
    && docker-php-ext-install pdo pdo_mysql zip \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy composer files from backend subdirectory
COPY Project-MySalonGweh-backend/composer.json Project-MySalonGweh-backend/composer.lock ./

# Install PHP dependencies without running scripts
RUN composer install \
    --no-dev \
    --no-scripts \
    --no-autoloader \
    --no-interaction

# Copy application files from backend subdirectory
COPY Project-MySalonGweh-backend/ .

# Clear any cached bootstrap files (to prevent class not found errors from build cache)
RUN rm -f bootstrap/cache/packages.php bootstrap/cache/services.php bootstrap/cache/config.php

# Generate optimized autoloader and run post-autoload-dump scripts now that artisan is copied
RUN composer dump-autoload --optimize --no-dev

# Cache Laravel config and routes
RUN php artisan config:cache || true
RUN php artisan route:cache || true
RUN php artisan view:cache || true

# Expose Railway port
EXPOSE 8080

# Start Laravel
CMD php artisan serve --host=0.0.0.0 --port=${PORT:-8080}

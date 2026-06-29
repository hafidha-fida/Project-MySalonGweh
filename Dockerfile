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

# Install PHP dependencies
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction

# Copy application files from backend subdirectory
COPY Project-MySalonGweh-backend/ .

# Cache Laravel config and routes
RUN php artisan config:cache || true
RUN php artisan route:cache || true
RUN php artisan view:cache || true

# Expose Railway port
EXPOSE 8080

# Start Laravel
CMD php artisan serve --host=0.0.0.0 --port=${PORT:-8080}

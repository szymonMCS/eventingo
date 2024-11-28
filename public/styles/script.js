(function ($) {
  $(document).ready(function () {
    $('#email-form').on('submit', function (event) {
      event.preventDefault();
      const isSuccess = Math.random() > 0.5;
      if (isSuccess) {
        $('.success-message').fadeIn();
        $('.error-message').hide();
      } else {
        $('.error-message').fadeIn();
        $('.success-message').hide();
      }
    });

    $('.success-message').hide();
    $('.error-message').hide();
  });
})(jQuery);

(function ($) {
  $(document).ready(function () {
    $('#email-form').on('submit', function (event) {
      event.preventDefault();

      const $submitButton = $(this).find('input[type="submit"]');
      const originalText = $submitButton.val();

      $submitButton.val($submitButton.data('wait')).prop('disabled', true);

      setTimeout(function () {
        const isSuccess = Math.random() > 0.5;

        if (isSuccess) {
          $('.success-message').fadeIn();
          $('.error-message').hide();
        } else {
          $('.error-message').fadeIn();
          $('.success-message').hide();
        }

        $submitButton.val(originalText).prop('disabled', false);
      }, 2000);
    });

    $('.success-message').hide();
    $('.error-message').hide();
  });
})(jQuery);

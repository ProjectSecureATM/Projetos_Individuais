import io.github.oshai.kotlinlogging.KotlinLogging


abstract class LoggingKotlin {

    companion object {
        private val logger = KotlinLogging.logger {}

        fun logInfo(log: String) {
            logger.info { log }
        }

        fun logWarning(log: String) {
            logger.warn { log }
        }

        fun logError(log: String) {
            logger.error { log }
        }
    }
}
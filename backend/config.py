from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import model_validator


class Settings(BaseSettings):
    ANTHROPIC_API_KEY: str = ""
    OPENAI_API_KEY: str = ""
    OLLAMA_BASE_URL: str = ""
    CHROMA_PATH: str = "./chroma_db"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    @model_validator(mode="after")
    def check_at_least_one_provider(self) -> "Settings":
        if not self.ANTHROPIC_API_KEY and not self.OPENAI_API_KEY:
            raise ValueError(
                "At least one of ANTHROPIC_API_KEY or OPENAI_API_KEY must be set."
            )
        return self


settings = Settings()

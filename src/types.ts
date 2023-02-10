export type Options = {
  hasVideo?: boolean;
  hasAudio?: boolean;
  mimeType?: string;
};

export type VideoInfo = {
  attestation: {
    playerAttestationRenderer: PlayerAttestationRenderer;
  };
  captions: {
    playerCaptionsTracklistRenderer: PlayerCaptionsTracklistRenderer;
  };
  cards: {
    cardCollectionRenderer: CardCollectionRenderer;
  };
  videoDetails: {
    videoId: string;
    title: string;
    lengthSeconds: string;
    keywords: string[];
    channelId: string;
    isOwnerViewing: boolean;
    shortDescription: string;
    isCrawlable: boolean;
    thumbnail: {
      thumbnails: {
        url: string;
        width: number;
        height: number;
      }[];
    };
    allowRatings: boolean;
    viewCount: string;
    author: string;
    isPrivate: boolean;
    isUnpluggedCorpus: boolean;
    isLiveContent: boolean;
  };
  playerConfig: PlayerConfig;
  storyboards: {
    playerStoryboardSpecRenderer: {
      spec: string;
    };
  };
  microformat: {
    playerMicroformatRenderer: {
      thumbnail: {
        thumbnails: {
          url: string;
          width: number;
          height: number;
        }[];
      };
      embed: {
        iframeUrl: string;
        flashUrl: string;
        width: number;
        height: number;
        flashSecureUrl: string;
      };
      title: { simpleText: string };
      description: {
        simpleText: string;
      };
      lengthSeconds: string;
      ownerProfileUrl: string;
      externalChannelId: string;
      isFamilySafe: boolean;
      availableCountries: string[];
      isUnlisted: boolean;
      hasYpcMetadata: boolean;
      viewCount: string;
      category: string;
      publishDate: string;
      ownerChannelName: string;
      uploadDate: string;
    };
  };
  trackingParams: string;
  frameworkUpdates: {
    entityBatchUpdate: {
      mutations: {
        entityKey: string;
        type: string;
        payload: {
          offlineabilityEntity: {
            key: string;
            addToOfflineButtonState: string;
          };
        };
      }[];
      timestamp: { seconds: string; nanos: number };
    };
  };
  responseContext: {
    serviceTrackingParams: {
      service: string;
      params: { key: string; value: string }[];
    }[];
    mainAppWebResponseContext: { loggedOut: boolean };
    webResponseContextExtensionData: { hasDecorated: boolean };
  };
  playabilityStatus: {
    status: string;
    playableInEmbed: boolean;
    miniplayer: { miniplayerRenderer: { playbackMode: string } };
    contextParams: string;
  };
  streamingData: {
    expiresInSeconds: string;
    formats: Format[];
    adaptiveFormats: Format[];
  };
  playbackTracking: {
    videostatsPlaybackUrl: {
      baseUrl: string;
    };
    videostatsDelayplayUrl: {
      baseUrl: string;
    };
    videostatsWatchtimeUrl: {
      baseUrl: string;
    };
    ptrackingUrl: {
      baseUrl: string;
    };
    qoeUrl: {
      baseUrl: string;
    };
    atrUrl: {
      baseUrl: string;
      elapsedMediaTimeSeconds: number;
    };
    videostatsScheduledFlushWalltimeSeconds: number[];
    videostatsDefaultFlushIntervalSeconds: number;
  };
};

export type Format = {
  itag: number;
  mimeType: string;
  bitrate: number;
  width?: number;
  height?: number;
  initRange?: { start: string; end: string };
  indexRange?: { start: string; end: string };
  lastModified: string;
  contentLength?: string;
  quality: string;
  fps?: number;
  qualityLabel?: string;
  projectionType: string;
  averageBitrate?: number;
  colorInfo?: {
    primaries: string;
    transferCharacteristics: string;
    matrixCoefficients: string;
  };
  approxDurationMs: string;
  signatureCipher: string;
  audioQuality?: string;
  audioSampleRate?: string;
  audioChannels?: number;
  loudnessDb?: number;
  url: string;
};

type CardCollectionRenderer = {
  cards: {
    cardRenderer: {
      teaser: {
        simpleCardTeaserRenderer: {
          message: { simpleText: string };
          trackingParams: string;
          prominent: boolean;
          logVisibilityUpdates: boolean;
          onTapCommand: {
            clickTrackingParams: string;
            changeEngagementPanelVisibilityAction: {
              targetId: string;
              visibility: string;
            };
          };
        };
      };
      cueRanges: {
        startCardActiveMs: string;
        endCardActiveMs: string;
        teaserDurationMs: string;
        iconAfterTeaserMs: string;
      }[];
      trackingParams: string;
    };
  }[];
  headerText: { simpleText: string };
  icon: {
    infoCardIconRenderer: {
      trackingParams: string;
    };
  };
  closeButton: {
    infoCardIconRenderer: {
      trackingParams: string;
    };
  };
  trackingParams: string;
  allowTeaserDismiss: boolean;
  logIconVisibilityUpdates: boolean;
};

type PlayerCaptionsTracklistRenderer = {
  captionTracks: {
    baseUrl: string;
    name: { simpleText: string };
    vssId: string;
    languageCode: string;
    kind: string;
    isTranslatable: boolean;
  }[];
  audioTracks: { captionTrackIndices: number[] }[];
  translationLanguages: {
    languageCode: string;
    languageName: { simpleText: string };
  }[];
};

type PlayerAttestationRenderer = {
  challenge: string;
  botguardData: {
    program: string;
    interpreterSafeUrl: {
      privateDoNotAccessOrElseTrustedResourceUrlWrappedValue: string;
    };
    serverEnvironment: 1;
  };
};

type PlayerConfig = {
  audioConfig: {
    loudnessDb: number;
    perceptualLoudnessDb: number;
    enablePerFormatLoudness: boolean;
  };
  streamSelectionConfig: { maxBitrate: string };
  mediaCommonConfig: {
    dynamicReadaheadConfig: {
      maxReadAheadMediaTimeMs: number;
      minReadAheadMediaTimeMs: number;
      readAheadGrowthRateMs: number;
    };
  };
  webPlayerConfig: {
    useCobaltTvosDash: boolean;
    webPlayerActionsPorting: {
      getSharePanelCommand: {
        clickTrackingParams: string;
        commandMetadata: {
          webCommandMetadata: { sendPost: boolean; apiUrl: string };
        };
        webPlayerShareEntityServiceEndpoint: {
          serializedShareEntity: string;
        };
      };
      subscribeCommand: {
        clickTrackingParams: string;
        commandMetadata: {
          webCommandMetadata: { sendPost: boolean; apiUrl: string };
        };
        subscribeEndpoint: { channelIds: string[]; params: string };
      };
      unsubscribeCommand: {
        clickTrackingParams: string;
        commandMetadata: {
          webCommandMetadata: { sendPost: boolean; apiUrl: string };
        };
        unsubscribeEndpoint: { channelIds: string[]; params: string };
      };
      addToWatchLaterCommand: {
        clickTrackingParams: string;
        commandMetadata: {
          webCommandMetadata: { sendPost: boolean; apiUrl: string };
        };
        playlistEditEndpoint: {
          playlistId: string;
          actions: { addedVideoId: string; action: string }[];
        };
      };
      removeFromWatchLaterCommand: {
        clickTrackingParams: string;
        commandMetadata: {
          webCommandMetadata: { sendPost: boolean; apiUrl: string };
        };
        playlistEditEndpoint: {
          playlistId: string;
          actions: { action: string; removedVideoId: string }[];
        };
      };
    };
  };
};
